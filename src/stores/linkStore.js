import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generateFriendlyId } from '@/utils/shortId'

const STORAGE_KEY = 'shorter_links'

export const useLinkStore = defineStore('links', () => {
  // State
  const links = ref([])
  const isLoading = ref(false)
  
  // Getters
  const totalLinks = computed(() => links.value.length)
  
  const totalClicks = computed(() => {
    return links.value.reduce((sum, link) => sum + (link.clicks || 0), 0)
  })
  
  const recentLinks = computed(() => {
    return [...links.value]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 10)
  })
  
  const popularLinks = computed(() => {
    return [...links.value]
      .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
      .slice(0, 5)
  })
  
  // Actions
  function loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        links.value = JSON.parse(stored)
      }
    } catch (e) {
      console.error('Failed to load links from storage:', e)
    }
  }
  
  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links.value))
    } catch (e) {
      console.error('Failed to save links to storage:', e)
    }
  }
  
  async function addLink(originalUrl, options = {}) {
    const { customCode, expiresIn, password, maxClicks, note } = options
    
    // 检查是否已存在相同的原始链接
    const existingLink = links.value.find(link => link.originalUrl === originalUrl)
    if (existingLink && !customCode) {
      // 如果已存在且没有指定自定义短码，返回已有的链接
      return existingLink
    }
    
    const code = customCode || generateFriendlyId(6)
    const baseUrl = window.location.origin
    
    // 计算过期时间
    let expiresAt = null
    if (expiresIn && expiresIn !== 'never') {
      const days = parseInt(expiresIn)
      expiresAt = Date.now() + days * 24 * 60 * 60 * 1000
    }
    
    const newLink = {
      id: Date.now().toString(),
      code,
      originalUrl,
      shortUrl: `${baseUrl}/${code}`,
      clicks: 0,
      createdAt: Date.now(),
      // 高级选项
      expiresAt,
      password: password || null,
      maxClicks: maxClicks && parseInt(maxClicks) > 0 ? parseInt(maxClicks) : null,
      note: note || null
    }
    
    // 调用 API 保存到 KV
    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: newLink.code,
          url: newLink.originalUrl,
          expiresAt: newLink.expiresAt,
          password: newLink.password,
          maxClicks: newLink.maxClicks,
          note: newLink.note
        })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save link')
      }
    } catch (e) {
      console.error('API save failed:', e)
      // 在开发环境中继续，生产环境应该抛出错误
      if (import.meta.env.PROD) {
        throw e
      }
    }
    
    links.value.unshift(newLink)
    saveToStorage()
    
    return newLink
  }
  
  function removeLink(id) {
    const index = links.value.findIndex(link => link.id === id)
    if (index > -1) {
      links.value.splice(index, 1)
      saveToStorage()
    }
  }
  
  function incrementClicks(code) {
    const link = links.value.find(l => l.code === code)
    if (link) {
      link.clicks = (link.clicks || 0) + 1
      saveToStorage()
    }
  }
  
  function updateLink(id, updates) {
    const link = links.value.find(l => l.id === id)
    if (link) {
      Object.assign(link, updates)
      saveToStorage()
    }
  }
  
  function findByCode(code) {
    return links.value.find(l => l.code === code)
  }
  
  function clearAll() {
    links.value = []
    saveToStorage()
  }
  
  // 初始化时加载数据
  loadFromStorage()
  
  return {
    // State
    links,
    isLoading,
    // Getters
    totalLinks,
    totalClicks,
    recentLinks,
    popularLinks,
    // Actions
    loadFromStorage,
    addLink,
    removeLink,
    incrementClicks,
    updateLink,
    findByCode,
    clearAll
  }
})
