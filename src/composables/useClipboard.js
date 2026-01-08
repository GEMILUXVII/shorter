import { useToast } from './useToast'

export function useClipboard() {
  const { success, error } = useToast()
  
  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text)
      success('已复制到剪贴板')
      return true
    } catch (err) {
      error('复制失败，请手动复制')
      return false
    }
  }
  
  return {
    copy
  }
}
