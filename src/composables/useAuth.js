import { ref, computed } from 'vue'

const token = ref(localStorage.getItem('auth_token') || null)
const user = ref(null)
const isLoading = ref(false)

export function useAuth() {
  const isLoggedIn = computed(() => !!token.value)
  
  async function register(email, password) {
    isLoading.value = true
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || '注册失败')
      }
      
      token.value = data.token
      user.value = { email: data.email }
      localStorage.setItem('auth_token', data.token)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }
  
  async function login(email, password) {
    isLoading.value = true
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || '登录失败')
      }
      
      token.value = data.token
      user.value = { email: data.email }
      localStorage.setItem('auth_token', data.token)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }
  
  async function fetchUser() {
    if (!token.value) return
    
    try {
      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token.value}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        user.value = { email: data.email }
      } else {
        // Token 无效，清除
        logout()
      }
    } catch {
      logout()
    }
  }
  
  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
  }
  
  function getAuthHeader() {
    return token.value ? { 'Authorization': `Bearer ${token.value}` } : {}
  }
  
  // 初始化时获取用户信息
  if (token.value && !user.value) {
    fetchUser()
  }
  
  return {
    token,
    user,
    isLoggedIn,
    isLoading,
    register,
    login,
    logout,
    fetchUser,
    getAuthHeader
  }
}
