/**
 * 短链跳转处理
 * GET /:code
 * 302 重定向到原始 URL
 */
export async function onRequestGet(context) {
  const { params, env, request } = context
  const code = params.code
  
  // 忽略一些特殊路径和 SPA 路由
  const ignorePaths = ['favicon.ico', 'favicon.svg', 'vite.svg', 'robots.txt', 'sitemap.xml']
  const spaRoutes = ['dashboard', 'login', 'register', 'settings', 'profile']
  
  // 静态资源扩展名 - 直接让 Cloudflare Pages 处理
  const staticExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.css', '.js', '.woff', '.woff2', '.ttf', '.eot']
  const hasStaticExtension = staticExtensions.some(ext => code.endsWith(ext))
  
  if (ignorePaths.includes(code) || hasStaticExtension) {
    return env.ASSETS.fetch(request)
  }
  
  // SPA 路由应该由前端处理，返回 null 让 Cloudflare Pages 处理
  if (spaRoutes.includes(code) || code.startsWith('assets')) {
    return env.ASSETS.fetch(request)
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
    <h2>链接不存在</h2>
    <p>抱歉，您访问的短链接不存在或已被删除。</p>
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
    <span class="icon">⏰</span>
    <h2>链接已过期</h2>
    <p>抱歉，该短链接已超过有效期，无法继续访问。</p>
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
    <span class="icon">🔒</span>
    <h2>访问已达上限</h2>
    <p>该链接的访问次数已达到设置的上限。</p>
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
    form { margin-top: 2rem; display: flex; flex-direction: column; align-items: center; }
    input[type="password"] {
      padding: 1rem 1.5rem;
      border: 1px solid var(--color-border);
      background: var(--color-bg);
      color: var(--color-text);
      border-radius: 9999px;
      font-size: 1rem;
      width: 100%;
      max-width: 320px;
      margin-bottom: 1.5rem;
      transition: all 0.3s;
      outline: none;
    }
    input[type="password"]:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 4px var(--color-primary-light);
    }
    button[type="submit"] {
      padding: 0.8rem 2.5rem;
      background: var(--color-primary);
      color: white;
      border: none;
      border-radius: 9999px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    @media (prefers-color-scheme: dark) {
      button[type="submit"] { color: #121212; font-weight: 600; }
      input[type="password"]:focus { box-shadow: 0 0 0 4px rgba(110, 231, 183, 0.2); }
    }
    button[type="submit"]:hover { 
      background: var(--color-primary-hover);
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    .error { 
      color: var(--color-error); 
      background: rgba(239, 68, 68, 0.1);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem; 
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <span class="icon">🔐</span>
    <h2>需要访问密码</h2>
    <p>此链接已加密，请输入密码继续访问</p>
    
    <form method="POST" action="/${code}">
      ${errorMsg ? `<div class="error">${errorMsg}</div>` : ''}
      <input type="password" name="password" placeholder="请输入访问密码" required autofocus>
      <button type="submit">验证并跳转</button>
    </form>
    
    <a href="/" style="background: transparent; color: var(--color-text-muted); padding: 0.5rem; margin-top: 1rem; box-shadow: none;">返回首页</a>
  </div>
</body>
</html>`,
    { status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}

// 通用样式
function getStyles() {
  return `<style>
    :root {
      --color-primary: #5c8d89;
      --color-primary-hover: #4a726f;
      --color-bg: #fdfbf7;
      --color-text: #2c2c2c;
      --color-text-muted: #6b7280;
      --color-border: #e6e2d8;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --color-primary: #6ee7b7;
        --color-primary-hover: #34d399;
        --color-bg: #121212;
        --color-text: #e5e5e5;
        --color-text-muted: #9ca3af;
        --color-border: #333333;
      }
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background: var(--color-bg);
      color: var(--color-text);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s, color 0.3s;
    }
    .container {
      text-align: center;
      padding: 3rem;
      max-width: 480px;
      width: 90%;
    }
    h1 { 
      font-family: 'Playfair Display', serif;
      font-size: 4rem; 
      color: var(--color-primary);
      margin-bottom: 1rem;
      font-weight: 700;
    }
    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--color-text);
    }
    p { 
      margin-top: 0.5rem; 
      color: var(--color-text-muted);
      font-size: 1.1rem;
      line-height: 1.6;
    }
    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-top: 2.5rem;
      padding: 0.75rem 2rem;
      background: var(--color-primary);
      color: white; /* Always white on primary button */
      text-decoration: none;
      border-radius: 9999px;
      font-weight: 500;
      transition: all 0.2s;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    @media (prefers-color-scheme: dark) {
      a { color: #121212; font-weight: 600; } /* Dark text on bright button in dark mode */
    }
    a:hover { 
      background: var(--color-primary-hover); 
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    .icon { font-size: 4rem; margin-bottom: 1.5rem; display: block; }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">`
}
