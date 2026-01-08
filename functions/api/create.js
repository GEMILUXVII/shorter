/**
 * 生成短链 ID
 * @param {number} length - ID 长度
 * @returns {string} 短链 ID
 */
function generateShortId(length = 6) {
  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789'
  let result = ''
  const randomValues = new Uint8Array(length)
  crypto.getRandomValues(randomValues)
  for (let i = 0; i < length; i++) {
    result += alphabet[randomValues[i] % alphabet.length]
  }
  return result
}

/**
 * 验证 URL 格式
 * @param {string} url - URL 字符串
 * @returns {boolean} 是否有效
 */
function isValidUrl(url) {
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

/**
 * 创建短链 API
 * POST /api/create
 * Body: { url: string, customCode?: string }
 */
export async function onRequestPost(context) {
  const { request, env } = context
  
  try {
    const body = await request.json()
    const { url, customCode } = body
    
    // 验证 URL
    if (!url) {
      return Response.json(
        { success: false, message: '请提供 URL' },
        { status: 400 }
      )
    }
    
    if (!isValidUrl(url)) {
      return Response.json(
        { success: false, message: '无效的 URL 格式' },
        { status: 400 }
      )
    }
    
    // 生成或使用自定义短码
    let code = customCode?.trim()
    
    if (code) {
      // 验证自定义短码格式
      if (!/^[a-zA-Z0-9-_]{3,20}$/.test(code)) {
        return Response.json(
          { success: false, message: '自定义短码只能包含字母、数字、横线和下划线，长度 3-20' },
          { status: 400 }
        )
      }
      
      // 保留路径 - 禁止使用这些作为短码
      const reservedCodes = [
        // 系统文件
        'favicon', 'favicon.svg', 'favicon.ico', 'vite.svg',
        'robots', 'robots.txt', 'sitemap', 'sitemap.xml',
        // SPA 路由
        'dashboard', 'login', 'register', 'settings', 'profile',
        // API 路径
        'api', 'assets', 'static', 'public',
        // 其他保留
        'admin', 'root', 'system', 'config', 'null', 'undefined'
      ]
      
      if (reservedCodes.includes(code.toLowerCase())) {
        return Response.json(
          { success: false, message: '该短码为系统保留，请更换' },
          { status: 400 }
        )
      }
      
      // 检查短码是否已存在
      const existing = await env.LINKS_KV.get(code)
      if (existing) {
        return Response.json(
          { success: false, message: '该短码已被使用' },
          { status: 409 }
        )
      }
    } else {
      // 生成唯一短码
      let attempts = 0
      do {
        code = generateShortId(6)
        const existing = await env.LINKS_KV.get(code)
        if (!existing) break
        attempts++
      } while (attempts < 10)
      
      if (attempts >= 10) {
        return Response.json(
          { success: false, message: '服务繁忙，请稍后重试' },
          { status: 503 }
        )
      }
    }
    
    // 保存到 KV
    const linkData = {
      url,
      clicks: 0,
      createdAt: Date.now()
    }
    
    await env.LINKS_KV.put(code, JSON.stringify(linkData))
    
    // 构建短链 URL
    const origin = new URL(request.url).origin
    const shortUrl = `${origin}/${code}`
    
    return Response.json({
      success: true,
      data: {
        code,
        shortUrl,
        originalUrl: url,
        createdAt: linkData.createdAt
      }
    })
    
  } catch (error) {
    console.error('Create link error:', error)
    return Response.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    )
  }
}
