/**
 * 获取统计数据 API
 * GET /api/stats
 */
export async function onRequestGet(context) {
  const { env } = context
  
  try {
    // 列出所有 key
    const listResult = await env.LINKS_KV.list()
    
    let totalClicks = 0
    let todayLinks = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayTimestamp = today.getTime()
    
    // 获取每个链接的数据
    await Promise.all(
      listResult.keys.map(async (key) => {
        const data = await env.LINKS_KV.get(key.name, 'json')
        if (data) {
          totalClicks += data.clicks || 0
          if (data.createdAt >= todayTimestamp) {
            todayLinks++
          }
        }
      })
    )
    
    return Response.json({
      success: true,
      data: {
        totalLinks: listResult.keys.length,
        totalClicks,
        todayLinks
      }
    })
    
  } catch (error) {
    console.error('Get stats error:', error)
    return Response.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    )
  }
}
