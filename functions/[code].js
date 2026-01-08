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
      // 短链不存在，返回 404 页面
      return new Response(
        `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>链接不存在 - Shorter</title>
  <style>
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
    h1 { font-size: 6rem; color: #f97316; }
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
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <p>抱歉，该短链接不存在或已过期</p>
    <a href="/">返回首页</a>
  </div>
</body>
</html>`,
        {
          status: 404,
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        }
      )
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
