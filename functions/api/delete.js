/**
 * 删除短链 API
 * DELETE /api/delete?code=xxx
 */
export async function onRequestDelete(context) {
  const { request, env } = context
  
  try {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    
    if (!code) {
      return Response.json(
        { success: false, message: '请提供短链码' },
        { status: 400 }
      )
    }
    
    // 检查是否存在
    const existing = await env.LINKS_KV.get(code)
    if (!existing) {
      return Response.json(
        { success: false, message: '短链不存在' },
        { status: 404 }
      )
    }
    
    // 删除
    await env.LINKS_KV.delete(code)
    
    return Response.json({
      success: true,
      message: '删除成功'
    })
    
  } catch (error) {
    console.error('Delete link error:', error)
    return Response.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    )
  }
}
