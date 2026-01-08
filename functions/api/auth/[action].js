/**
 * 用户认证 API
 */

// 简单的密码哈希（生产环境应使用 bcrypt 或类似库）
async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'shorter_salt_2024')
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

// 生成 JWT
async function generateToken(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' }
  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '')
  const encodedPayload = btoa(JSON.stringify({ ...payload, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).replace(/=/g, '')
  
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(`${encodedHeader}.${encodedPayload}`))
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`
}

// 验证 JWT
async function verifyToken(token, secret) {
  try {
    const [header, payload, signature] = token.split('.')
    const decoded = JSON.parse(atob(payload))
    
    if (decoded.exp < Date.now()) {
      return null
    }
    
    return decoded
  } catch {
    return null
  }
}

/**
 * POST /api/auth/register
 */
export async function onRequestPost(context) {
  const { env, request } = context
  const url = new URL(request.url)
  const action = url.pathname.split('/').pop()
  
  if (action === 'register') {
    return handleRegister(env, request)
  } else if (action === 'login') {
    return handleLogin(env, request)
  }
  
  return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
}

async function handleRegister(env, request) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return jsonResponse({ error: '请填写邮箱和密码' }, 400)
    }
    
    if (password.length < 6) {
      return jsonResponse({ error: '密码至少6位' }, 400)
    }
    
    // 检查用户是否已存在
    const existing = await env.USERS_KV.get(email)
    if (existing) {
      return jsonResponse({ error: '该邮箱已注册' }, 409)
    }
    
    // 创建用户
    const passwordHash = await hashPassword(password)
    const user = {
      email,
      passwordHash,
      createdAt: Date.now()
    }
    
    await env.USERS_KV.put(email, JSON.stringify(user))
    
    // 生成 token
    const token = await generateToken({ email }, env.JWT_SECRET || 'default_secret')
    
    return jsonResponse({ success: true, token, email })
    
  } catch (error) {
    console.error('Register error:', error)
    return jsonResponse({ error: '注册失败' }, 500)
  }
}

async function handleLogin(env, request) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return jsonResponse({ error: '请填写邮箱和密码' }, 400)
    }
    
    // 查找用户
    const userData = await env.USERS_KV.get(email, 'json')
    if (!userData) {
      return jsonResponse({ error: '邮箱或密码错误' }, 401)
    }
    
    // 验证密码
    const passwordHash = await hashPassword(password)
    if (passwordHash !== userData.passwordHash) {
      return jsonResponse({ error: '邮箱或密码错误' }, 401)
    }
    
    // 生成 token
    const token = await generateToken({ email }, env.JWT_SECRET || 'default_secret')
    
    return jsonResponse({ success: true, token, email })
    
  } catch (error) {
    console.error('Login error:', error)
    return jsonResponse({ error: '登录失败' }, 500)
  }
}

/**
 * GET /api/auth/me
 */
export async function onRequestGet(context) {
  const { env, request } = context
  
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return jsonResponse({ error: '未登录' }, 401)
  }
  
  const token = authHeader.slice(7)
  const payload = await verifyToken(token, env.JWT_SECRET || 'default_secret')
  
  if (!payload) {
    return jsonResponse({ error: 'Token 无效或已过期' }, 401)
  }
  
  return jsonResponse({ email: payload.email })
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })
}
