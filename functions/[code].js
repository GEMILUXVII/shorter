/**
 * 短链跳转处理
 * GET /:code
 * 302 重定向到原始 URL
 */
export async function onRequestGet(context) {
  const { params, env, request } = context
  const code = params.code
  
  // 忽略一些特殊路径
  const ignorePaths = ['favicon.ico', 'robots.txt', 'sitemap.xml']
  if (ignorePaths.includes(code)) {
    return new Response('Not Found', { status: 404 })
  }
  
  try {
    // 从 KV 获取链接数据
    const data = await env.LINKS_KV.get(code, 'json')
    
    if (!data || !data.url) {
      return render404Page()
    }
    
    // 检查链接是否过期
    if (data.expiresAt && Date.now() > data.expiresAt) {
      return renderExpiredPage()
    }
    
    // 检查访问次数是否超限
    if (data.maxClicks && (data.clicks || 0) >= data.maxClicks) {
      return renderMaxClicksPage()
    }
    
    // 检查是否需要密码验证
    if (data.password) {
      // 检查 cookie 中是否有有效的验证
      const cookies = parseCookies(request.headers.get('cookie') || '')
      const authCookie = cookies[`auth_${code}`]
      
      if (authCookie !== data.password) {
        return renderPasswordPage(code)
      }
    }
    
    // 异步更新点击计数（不阻塞重定向）
    context.waitUntil(
      env.LINKS_KV.put(code, JSON.stringify({
        ...data,
        clicks: (data.clicks || 0) + 1
      }))
    )
    
    // 302 重定向到原始 URL
    return Response.redirect(data.url, 302)
    
  } catch (error) {
    console.error('Redirect error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

/**
 * 密码验证处理
 * POST /:code
 */
export async function onRequestPost(context) {
  const { params, env, request } = context
  const code = params.code
  
  try {
    const formData = await request.formData()
    const inputPassword = formData.get('password')
    
    const data = await env.LINKS_KV.get(code, 'json')
    
    if (!data || !data.password) {
      return Response.redirect(`/${code}`, 302)
    }
    
    if (inputPassword === data.password) {
      // 密码正确，设置 cookie 并重定向
      return new Response(null, {
        status: 302,
        headers: {
          'Location': `/${code}`,
          'Set-Cookie': `auth_${code}=${data.password}; Path=/; Max-Age=3600; HttpOnly; SameSite=Strict`
        }
      })
    } else {
      // 密码错误
      return renderPasswordPage(code, '密码错误，请重试')
    }
  } catch (error) {
    console.error('Password verification error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

// 解析 Cookie
function parseCookies(cookieString) {
  const cookies = {}
  cookieString.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=')
    if (name && value) {
      cookies[name] = value
    }
  })
  return cookies
}

// 404 页面
function render404Page() {
  return new Response(
    `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>链接不存在 - Shorter</title>
  ${getStyles()}
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <p>抱歉，该短链接不存在</p>
    <a href="/">返回首页</a>
  </div>
</body>
</html>`,
    { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}

// 过期页面
function renderExpiredPage() {
  return new Response(
    `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>链接已过期 - Shorter</title>
  ${getStyles()}
</head>
<body>
  <div class="container">
    <h1>⏰</h1>
    <p>抱歉，该短链接已过期</p>
    <a href="/">返回首页</a>
  </div>
</body>
</html>`,
    { status: 410, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}

// 访问次数超限页面
function renderMaxClicksPage() {
  return new Response(
    `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>访问已达上限 - Shorter</title>
  ${getStyles()}
</head>
<body>
  <div class="container">
    <h1>🔒</h1>
    <p>该链接访问次数已达上限</p>
    <a href="/">返回首页</a>
  </div>
</body>
</html>`,
    { status: 410, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}

// 密码验证页面
function renderPasswordPage(code, errorMsg = '') {
  return new Response(
    `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>需要密码 - Shorter</title>
  ${getStyles()}
  <style>
    form { margin-top: 2rem; }
    input[type="password"] {
      padding: 0.75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      width: 100%;
      max-width: 300px;
      margin-bottom: 1rem;
    }
    input[type="password"]:focus {
      outline: none;
      border-color: #f97316;
      box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
    }
    button[type="submit"] {
      padding: 0.75rem 2rem;
      background: #f97316;
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      cursor: pointer;
    }
    button[type="submit"]:hover { background: #ea580c; }
    .error { color: #ef4444; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔐</h1>
    <p>此链接受密码保护</p>
    ${errorMsg ? `<p class="error">${errorMsg}</p>` : ''}
    <form method="POST" action="/${code}">
      <input type="password" name="password" placeholder="请输入访问密码" required autofocus>
      <br>
      <button type="submit">验证</button>
    </form>
  </div>
</body>
</html>`,
    { status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}

// 通用样式
function getStyles() {
  return `<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #fafafa;
      color: #171717;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    h1 { font-size: 5rem; color: #f97316; }
    p { margin-top: 1rem; color: #525252; }
    a {
      display: inline-block;
      margin-top: 2rem;
      padding: 0.75rem 1.5rem;
      background: #f97316;
      color: white;
      text-decoration: none;
      border-radius: 0.5rem;
    }
    a:hover { background: #ea580c; }
  </style>`
}
