/**
 * 短链跳转处理
 * GET /:code
 * 302 重定向到原始 URL
 */
import { verifyPassword } from './api/links.js'

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
      // 检查 cookie 中是否有有效的验证令牌
      const cookies = parseCookies(request.headers.get('cookie') || '')
      const authCookie = cookies[`auth_${code}`]

      // 使用安全令牌验证而非密码比对
      const expectedToken = await generateAuthToken(code, data.password)
      if (authCookie !== expectedToken) {
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
    
    if (await verifyPassword(inputPassword, data.password)) {
      // 密码正确，生成安全令牌并设置 cookie
      const authToken = await generateAuthToken(code, data.password)
      return new Response(null, {
        status: 302,
        headers: {
          'Location': `/${code}`,
          'Set-Cookie': `auth_${code}=${authToken}; Path=/; Max-Age=3600; HttpOnly; SameSite=Strict`
        }
      })
    } else {
      // 密码错误
      return renderPasswordPage(code, 'Incorrect password. Please try again.')
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

// 生成安全的认证令牌（基于 code + password hash 的 HMAC）
async function generateAuthToken(code, passwordHash) {
  const encoder = new TextEncoder()
  const data = encoder.encode(`${code}:${passwordHash}`)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32)
}

// 生成星星背景 HTML
function getStarsHtml() {
  return `
    <div class="star" style="top: 10%; left: 15%; --duration: 2.5s; --delay: 0s;"></div>
    <div class="star" style="top: 20%; left: 80%; --duration: 3s; --delay: 0.5s;"></div>
    <div class="star" style="top: 35%; left: 5%; --duration: 2.8s; --delay: 1s;"></div>
    <div class="star" style="top: 15%; left: 90%; --duration: 3.5s; --delay: 0.3s;"></div>
    <div class="star" style="top: 70%; left: 10%; --duration: 2.2s; --delay: 0.8s;"></div>
    <div class="star" style="top: 80%; left: 85%; --duration: 3.2s; --delay: 1.2s;"></div>
  `
}

// 404 页面
function render404Page() {
  return new Response(
    `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Link Not Found - Shorter</title>
  ${getStyles()}
</head>
<body>
  <!-- Aurora Background -->
  <div class="aurora">
    <div class="aurora-layer"></div>
  </div>
  ${getStarsHtml()}

  <div class="container glass-panel animate-fade-in-up">
    <h1>404</h1>
    <h2>Link Not Found</h2>
    <p>The short link you're looking for doesn't exist or has been removed.</p>
    <a href="/" class="btn">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Back to Home
    </a>
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
  <title>Link Expired - Shorter</title>
  ${getStyles()}
</head>
<body>
  <!-- Aurora Background -->
  <div class="aurora">
    <div class="aurora-layer"></div>
  </div>
  ${getStarsHtml()}

  <div class="container glass-panel animate-fade-in-up">
    <div class="icon-wrapper">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h2>Link Expired</h2>
    <p>This short link has passed its expiration date and is no longer available.</p>
    <a href="/" class="btn">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Back to Home
    </a>
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
  <title>Click Limit Reached - Shorter</title>
  ${getStyles()}
</head>
<body>
  <!-- Aurora Background -->
  <div class="aurora">
    <div class="aurora-layer"></div>
  </div>
  ${getStarsHtml()}

  <div class="container glass-panel animate-fade-in-up">
    <div class="icon-wrapper">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    </div>
    <h2>Click Limit Reached</h2>
    <p>This link has reached its maximum number of allowed clicks and is no longer accessible.</p>
    <a href="/" class="btn">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Back to Home
    </a>
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
  <title>Password Required - Shorter</title>
  ${getStyles()}
  <style>
    form {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .input-wrapper {
      position: relative;
      width: 100%;
      max-width: 280px;
      margin-bottom: 1.5rem;
    }

    .input-wrapper svg {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      color: var(--muted-foreground);
      pointer-events: none;
    }

    input[type="password"] {
      width: 100%;
      padding: 0.875rem 1rem 0.875rem 2.75rem;
      border: 1px solid var(--border);
      background: color-mix(in oklab, var(--background), transparent 50%);
      color: var(--foreground);
      border-radius: 9999px;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      outline: none;
    }

    input[type="password"]::placeholder {
      color: var(--muted-foreground);
    }

    input[type="password"]:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary), transparent 85%);
      background: color-mix(in oklab, var(--background), transparent 30%);
    }

    .error {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--error);
      background: color-mix(in oklab, var(--error), transparent 90%);
      padding: 0.625rem 1rem;
      border-radius: 0.75rem;
      margin-bottom: 1.25rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .error svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
  </style>
</head>
<body>
  <!-- Aurora Background -->
  <div class="aurora">
    <div class="aurora-layer"></div>
  </div>
  ${getStarsHtml()}

  <div class="container glass-panel animate-fade-in-up">
    <div class="icon-wrapper">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </div>
    <h2>Password Required</h2>
    <p>This link is protected. Please enter the password to continue.</p>

    <form method="POST" action="/${code}">
      ${errorMsg ? `<div class="error">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ${errorMsg}
      </div>` : ''}
      <div class="input-wrapper">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
        <input type="password" name="password" placeholder="Enter password" required autofocus>
      </div>
      <button type="submit" class="btn">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Verify & Continue
      </button>
    </form>

    <a href="/" class="btn btn-ghost">Back to Home</a>
  </div>
</body>
</html>`,
    { status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}

// 通用样式 - 与主站设计系统统一
function getStyles() {
  return `<style>
    :root {
      /* 主色调 - 极简黑 (亮色模式) */
      --primary: oklch(25% 0.005 60);
      --primary-hover: oklch(35% 0.005 60);
      --primary-foreground: oklch(99% 0 0);

      /* 背景色 - 温暖奶油色 */
      --background: oklch(94% 0.025 80);
      --card: oklch(96% 0.018 80);

      /* 文字色 */
      --foreground: oklch(25% 0.02 55);
      --muted-foreground: oklch(52% 0.015 55);

      /* 边框 */
      --border: oklch(85% 0.025 80);

      /* 状态色 */
      --error: oklch(60% 0.25 25);
      --success: oklch(65% 0.2 145);
    }

    @media (prefers-color-scheme: dark) {
      :root {
        /* 主色调 - 明亮白 (暗色模式) */
        --primary: oklch(95% 0.005 60);
        --primary-hover: oklch(85% 0.005 60);
        --primary-foreground: oklch(15% 0.01 60);

        /* 背景色 - 深邃午夜 */
        --background: oklch(14% 0.005 286);
        --card: oklch(21% 0.006 286);

        /* 文字色 */
        --foreground: oklch(98.5% 0 0);
        --muted-foreground: oklch(70% 0.015 286);

        /* 边框 */
        --border: oklch(100% 0 0 / 10%);
      }
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background: var(--background);
      color: var(--foreground);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s, color 0.3s;
      -webkit-font-smoothing: antialiased;
      position: relative;
      overflow: hidden;
    }

    /* 极光背景效果 */
    .aurora {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }

    .aurora-layer {
      position: absolute;
      inset: -50%;
      background-image: linear-gradient(
        115deg,
        oklch(92% 0.08 140) 0%,
        oklch(90% 0.1 60) 20%,
        oklch(88% 0.12 200) 40%,
        oklch(91% 0.1 320) 60%,
        oklch(89% 0.08 100) 80%,
        oklch(92% 0.08 140) 100%
      );
      background-size: 400% 100%;
      filter: blur(40px);
      opacity: 0.6;
      animation: aurora-flow 20s ease-in-out infinite;
    }

    @media (prefers-color-scheme: dark) {
      .aurora-layer {
        background-image: linear-gradient(
          115deg,
          oklch(30% 0.15 280) 0%,
          oklch(25% 0.1 320) 25%,
          oklch(20% 0.12 260) 50%,
          oklch(28% 0.08 300) 75%,
          oklch(30% 0.15 280) 100%
        );
        opacity: 0.4;
      }
    }

    @keyframes aurora-flow {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    /* 星星效果 */
    .star {
      position: absolute;
      width: 3px;
      height: 3px;
      background: white;
      border-radius: 50%;
      animation: twinkle var(--duration, 3s) ease-in-out infinite;
      animation-delay: var(--delay, 0s);
      box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.4);
      opacity: 0.15;
    }

    @media (prefers-color-scheme: dark) {
      .star {
        opacity: 1;
        box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
      }
    }

    @keyframes twinkle {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    /* 玻璃面板 */
    .glass-panel {
      background: color-mix(in oklab, var(--card), transparent 40%);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border);
      border-radius: 1.5rem;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -2px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    @media (prefers-color-scheme: dark) {
      .glass-panel {
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow:
          0 0 0 1px rgba(0,0,0,0.8),
          0 10px 25px rgba(0,0,0,0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.05);
      }
    }

    .container {
      position: relative;
      z-index: 10;
      text-align: center;
      padding: 3rem 2.5rem;
      max-width: 420px;
      width: 90%;
    }

    /* 图标样式 */
    .icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      margin-bottom: 1.5rem;
      border-radius: 50%;
      background: color-mix(in oklab, var(--primary), transparent 90%);
    }

    .icon-wrapper svg {
      width: 40px;
      height: 40px;
      color: var(--foreground);
      opacity: 0.8;
    }

    h1 {
      font-size: 5rem;
      font-weight: 200;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, var(--foreground) 0%, var(--muted-foreground) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: 1rem;
      color: var(--foreground);
      letter-spacing: -0.01em;
    }

    p {
      margin-top: 0.5rem;
      color: var(--muted-foreground);
      font-size: 1rem;
      line-height: 1.7;
      font-weight: 400;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
      padding: 0.875rem 2rem;
      background: var(--primary);
      color: var(--primary-foreground);
      text-decoration: none;
      border-radius: 9999px;
      font-weight: 500;
      font-size: 0.95rem;
      letter-spacing: 0.01em;
      transition: all 0.2s ease;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.15),
        0 2px 8px rgba(0, 0, 0, 0.15);
      border: none;
      cursor: pointer;
    }

    .btn:hover {
      background: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        0 8px 20px rgba(0, 0, 0, 0.2);
    }

    .btn svg {
      width: 18px;
      height: 18px;
    }

    .btn-ghost {
      background: transparent;
      color: var(--muted-foreground);
      box-shadow: none;
      padding: 0.5rem 1rem;
      margin-top: 1rem;
      font-size: 0.875rem;
    }

    .btn-ghost:hover {
      color: var(--foreground);
      background: color-mix(in oklab, var(--foreground), transparent 95%);
      transform: none;
      box-shadow: none;
    }

    /* 动画 */
    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in-up {
      animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">`
}
