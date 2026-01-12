/**
 * 创建短链 API
 * POST /api/links
 */
export async function onRequestPost(context) {
  const { env, request } = context
  
  try {
    const data = await request.json()
    const { code, url, expiresAt, password, maxClicks, note } = data
    
    if (!code || !url) {
      return jsonResponse({ error: 'Missing required fields' }, 400)
    }
    
    // 获取当前用户（如果已登录）
    const userEmail = await getUserFromRequest(request, env)
    
    // 检查短码是否已存在
    const existing = await env.LINKS_KV.get(code)
    if (existing) {
      return jsonResponse({ error: 'Code already exists' }, 409)
    }
    
    // 如果有密码，进行哈希处理
    let hashedPassword = null
    if (password) {
      hashedPassword = await hashPassword(password)
    }

    // 保存到 KV
    const linkData = {
      url,
      clicks: 0,
      createdAt: Date.now(),
      expiresAt: expiresAt || null,
      password: hashedPassword,
      maxClicks: maxClicks || null,
      note: note || null,
      userId: userEmail || null  // 关联用户
    }
    
    // 同时保存用户索引（用于快速查询用户的所有链接）
    await env.LINKS_KV.put(code, JSON.stringify(linkData))

    // 如果用户已登录，更新用户的链接索引
    if (userEmail) {
      const userIndexKey = `user:${userEmail}`
      const existingIndex = await env.LINKS_KV.get(userIndexKey, 'json') || []
      existingIndex.push({
        code,
        createdAt: linkData.createdAt
      })
      await env.LINKS_KV.put(userIndexKey, JSON.stringify(existingIndex))
    }

    return jsonResponse({ success: true, code }, 201)
    
  } catch (error) {
    console.error('Create link error:', error)
    return jsonResponse({ error: 'Internal server error' }, 500)
  }
}

/**
 * 获取用户的链接
 * GET /api/links
 * 优化：使用用户索引避免 N+1 查询
 */
export async function onRequestGet(context) {
  const { env, request } = context

  try {
    // 获取当前用户
    const userEmail = await getUserFromRequest(request, env)

    if (!userEmail) {
      return jsonResponse({ error: '请先登录' }, 401)
    }

    // 从用户索引获取链接列表（避免遍历所有 key）
    const userIndexKey = `user:${userEmail}`
    const userIndex = await env.LINKS_KV.get(userIndexKey, 'json') || []

    // 批量获取链接详情（使用 Promise.all 并行查询）
    const origin = new URL(request.url).origin
    const linksPromises = userIndex.map(async (item) => {
      const data = await env.LINKS_KV.get(item.code, 'json')
      if (!data) return null // 链接可能已被删除

      return {
        id: item.code,
        code: item.code,
        originalUrl: data.url,
        shortUrl: `${origin}/${item.code}`,
        clicks: data.clicks || 0,
        createdAt: data.createdAt,
        expiresAt: data.expiresAt,
        hasPassword: !!data.password,
        maxClicks: data.maxClicks,
        note: data.note
      }
    })

    const links = (await Promise.all(linksPromises)).filter(Boolean)

    // 按创建时间倒序
    links.sort((a, b) => b.createdAt - a.createdAt)

    return jsonResponse(links)

  } catch (error) {
    console.error('List links error:', error)
    return jsonResponse({ error: 'Internal server error' }, 500)
  }
}

// 从请求中获取用户（带 JWT 签名验证）
async function getUserFromRequest(request, env) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.slice(7)
  try {
    const [headerB64, payloadB64, signatureB64] = token.split('.')
    if (!headerB64 || !payloadB64 || !signatureB64) {
      return null
    }

    // 验证 JWT 签名
    const secret = env.JWT_SECRET
    if (!secret) {
      console.error('JWT_SECRET not configured')
      return null
    }

    // 使用 Web Crypto API 验证 HMAC-SHA256 签名
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    const signatureData = base64UrlDecode(signatureB64)
    const dataToVerify = encoder.encode(`${headerB64}.${payloadB64}`)

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureData,
      dataToVerify
    )

    if (!isValid) {
      return null
    }

    // 解码 payload
    const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')))

    // 验证过期时间（JWT exp 是秒级时间戳）
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null
    }

    return payload.email
  } catch (err) {
    console.error('JWT verification error:', err)
    return null
  }
}

// Base64URL 解码
function base64UrlDecode(str) {
  // 将 Base64URL 转换为标准 Base64
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  // 添加填充
  while (base64.length % 4) {
    base64 += '='
  }
  // 解码为二进制
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

// 密码哈希函数（SHA-256 + 随机盐）
async function hashPassword(password) {
  const encoder = new TextEncoder()
  // 生成 16 字节随机盐
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')

  // 组合盐和密码进行哈希
  const data = encoder.encode(saltHex + password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  // 返回格式: salt$hash
  return `${saltHex}$${hashHex}`
}

// 导出验证密码函数供其他模块使用
export async function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes('$')) {
    // 兼容旧的明文密码（过渡期）
    return password === storedHash
  }

  const [salt, hash] = storedHash.split('$')
  const encoder = new TextEncoder()
  const data = encoder.encode(salt + password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  return hashHex === hash
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 删除链接
 * DELETE /api/links?code=xxx
 */
export async function onRequestDelete(context) {
  const { env, request } = context
  
  try {
    const userEmail = await getUserFromRequest(request, env)
    if (!userEmail) {
      return jsonResponse({ error: '请先登录' }, 401)
    }
    
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    
    if (!code) {
      return jsonResponse({ error: '缺少链接编码' }, 400)
    }
    
    // 检查链接是否属于当前用户
    const data = await env.LINKS_KV.get(code, 'json')
    if (!data) {
      return jsonResponse({ error: '链接不存在' }, 404)
    }
    
    if (data.userId !== userEmail) {
      return jsonResponse({ error: '无权删除此链接' }, 403)
    }
    
    // 删除链接
    await env.LINKS_KV.delete(code)

    // 更新用户索引（移除已删除的链接）
    const userIndexKey = `user:${userEmail}`
    const userIndex = await env.LINKS_KV.get(userIndexKey, 'json') || []
    const updatedIndex = userIndex.filter(item => item.code !== code)
    await env.LINKS_KV.put(userIndexKey, JSON.stringify(updatedIndex))

    return jsonResponse({ success: true })
    
  } catch (error) {
    console.error('Delete link error:', error)
    return jsonResponse({ error: 'Internal server error' }, 500)
  }
}

