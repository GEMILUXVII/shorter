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
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // 检查短码是否已存在
    const existing = await env.LINKS_KV.get(code)
    if (existing) {
      return new Response(JSON.stringify({ error: 'Code already exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // 保存到 KV
    const linkData = {
      url,
      clicks: 0,
      createdAt: Date.now(),
      expiresAt: expiresAt || null,
      password: password || null,
      maxClicks: maxClicks || null,
      note: note || null
    }
    
    await env.LINKS_KV.put(code, JSON.stringify(linkData))
    
    return new Response(JSON.stringify({ success: true, code }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error('Create link error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

/**
 * 获取所有链接（用于管理面板）
 * GET /api/links
 */
export async function onRequestGet(context) {
  const { env } = context
  
  try {
    // 列出所有 key
    const list = await env.LINKS_KV.list()
    const links = []
    
    for (const key of list.keys) {
      const data = await env.LINKS_KV.get(key.name, 'json')
      if (data) {
        links.push({
          code: key.name,
          ...data
        })
      }
    }
    
    return new Response(JSON.stringify(links), {
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error('List links error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
