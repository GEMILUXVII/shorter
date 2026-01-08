import { ref } from 'vue'
import { useToast } from './useToast'

const API_BASE = '/api'

export function useApi() {
  const loading = ref(false)
  const { error: showError } = useToast()
  
  async function request(endpoint, options = {}) {
    loading.value = true
    
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `请求失败: ${response.status}`)
      }
      
      return await response.json()
    } catch (err) {
      showError(err.message || '网络请求失败')
      throw err
    } finally {
      loading.value = false
    }
  }
  
  async function get(endpoint) {
    return request(endpoint, { method: 'GET' })
  }
  
  async function post(endpoint, data) {
    return request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  async function del(endpoint) {
    return request(endpoint, { method: 'DELETE' })
  }
  
  return {
    loading,
    get,
    post,
    del
  }
}
