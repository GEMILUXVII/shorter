/**
 * 验证 URL 格式
 * @param {string} url - 要验证的 URL
 * @returns {boolean} 是否有效
 */
export function isValidUrl(url) {
  if (!url || typeof url !== 'string') {
    return false
  }
  
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

/**
 * 验证短链 code 格式
 * @param {string} code - 短链 code
 * @returns {boolean} 是否有效
 */
export function isValidCode(code) {
  if (!code || typeof code !== 'string') {
    return false
  }
  
  // 允许字母数字，长度 4-10
  return /^[a-zA-Z0-9]{4,10}$/.test(code)
}

/**
 * 格式化 URL（添加协议前缀）
 * @param {string} url - 原始 URL
 * @returns {string} 格式化后的 URL
 */
export function formatUrl(url) {
  if (!url) return ''
  
  url = url.trim()
  
  // 如果没有协议，添加 https://
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url
  }
  
  return url
}

/**
 * 提取域名
 * @param {string} url - 完整 URL
 * @returns {string} 域名
 */
export function extractDomain(url) {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return url
  }
}

/**
 * 截断文本
 * @param {string} text - 原始文本
 * @param {number} maxLength - 最大长度
 * @returns {string} 截断后的文本
 */
export function truncateText(text, maxLength = 50) {
  if (!text || text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength) + '...'
}
