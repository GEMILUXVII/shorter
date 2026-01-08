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
    
    // 必须是 http 或 https 协议
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false
    }
    
    // 主机名必须包含至少一个点（排除 localhost 等）
    // 例如：example.com, sub.example.com
    const hostname = urlObj.hostname
    
    // 检查是否是 IP 地址（允许）
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/
    if (ipv4Pattern.test(hostname)) {
      return true
    }
    
    // 检查是否是有效域名（必须包含点，且不能以点开头或结尾）
    if (!hostname.includes('.') || hostname.startsWith('.') || hostname.endsWith('.')) {
      return false
    }
    
    // 检查域名各部分是否有效（至少2个字符的顶级域名）
    const parts = hostname.split('.')
    const tld = parts[parts.length - 1]
    if (tld.length < 2) {
      return false
    }
    
    // 域名只能包含字母、数字和连字符
    const domainPattern = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/
    for (const part of parts) {
      if (!part || !domainPattern.test(part)) {
        return false
      }
    }
    
    return true
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
