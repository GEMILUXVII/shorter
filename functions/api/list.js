/**
 * 获取短链列表 API
 * GET /api/list
 * Query: cursor (可选，用于分页)
 */
export async function onRequestGet(context) {
  const { request, env } = context
  
  try {
    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor') || undefined
    const limit = parseInt(url.searchParams.get('limit') || '50', 10)
    
    // 列出所有 key
    const listResult = await env.LINKS_KV.list({
      cursor,
      limit: Math.min(limit, 100)
    })
    
    // 获取每个 key 的详细数据
    const links = await Promise.all(
      listResult.keys.map(async (key) => {
        const data = await env.LINKS_KV.get(key.name, 'json')
        if (!data) return null
        
        const origin = new URL(request.url).origin
        return {
          id: key.name,
          code: key.name,
          originalUrl: data.url,
          shortUrl: `${origin}/${key.name}`,
          clicks: data.clicks || 0,
          createdAt: data.createdAt
        }
      })
    )
    
    // 过滤掉无效数据并按创建时间排序
    const validLinks = links
      .filter(Boolean)
      .sort((a, b) => b.createdAt - a.createdAt)
    
    return Response.json({
      success: true,
      data: {
        links: validLinks,
        cursor: listResult.cursor,
        hasMore: !listResult.list_complete
      }
    })
    
  } catch (error) {
    console.error('List links error:', error)
    return Response.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    )
  }
}
