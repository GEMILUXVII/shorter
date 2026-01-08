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
    
    // 保存到 KV
    const linkData = {
      url,
      clicks: 0,
      createdAt: Date.now(),
      expiresAt: expiresAt || null,
      password: password || null,
      maxClicks: maxClicks || null,
      note: note || null,
      userId: userEmail || null  // 关联用户
    }
    
    await env.LINKS_KV.put(code, JSON.stringify(linkData))
    
    return jsonResponse({ success: true, code }, 201)
    
  } catch (error) {
    console.error('Create link error:', error)
    return jsonResponse({ error: 'Internal server error' }, 500)
  }
}

/**
 * 获取用户的链接
 * GET /api/links
 */
export async function onRequestGet(context) {
  const { env, request } = context
  
  try {
    // 获取当前用户
    const userEmail = await getUserFromRequest(request, env)
    
    if (!userEmail) {
      return jsonResponse({ error: '请先登录' }, 401)
    }
    
    // 列出所有 key 并过滤当前用户的
    const list = await env.LINKS_KV.list()
    const links = []
    
    for (const key of list.keys) {
      const data = await env.LINKS_KV.get(key.name, 'json')
      if (data && data.userId === userEmail) {
        links.push({
          id: key.name,
          code: key.name,
          originalUrl: data.url,
          shortUrl: `${new URL(request.url).origin}/${key.name}`,
          clicks: data.clicks || 0,
          createdAt: data.createdAt,
          expiresAt: data.expiresAt,
          password: data.password,
          maxClicks: data.maxClicks,
          note: data.note
        })
      }
    }
    
    // 按创建时间倒序
    links.sort((a, b) => b.createdAt - a.createdAt)
    
    return jsonResponse(links)
    
  } catch (error) {
    console.error('List links error:', error)
    return jsonResponse({ error: 'Internal server error' }, 500)
  }
}

// 从请求中获取用户
async function getUserFromRequest(request, env) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.slice(7)
  try {
    const [, payload] = token.split('.')
    const decoded = JSON.parse(atob(payload))
    
    if (decoded.exp < Date.now()) {
      return null
    }
    
    return decoded.email
  } catch {
    return null
  }
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
    
    return jsonResponse({ success: true })
    
  } catch (error) {
    console.error('Delete link error:', error)
    return jsonResponse({ error: 'Internal server error' }, 500)
  }
}

