import { nanoid } from 'nanoid'

/**
 * 生成短链 ID
 * @param {number} length - ID 长度，默认 6
 * @returns {string} 短链 ID
 */
export function generateShortId(length = 6) {
  return nanoid(length)
}

/**
 * 生成自定义字符集的短链 ID
 * 只使用小写字母和数字，避免混淆字符
 */
export function generateFriendlyId(length = 6) {
  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789' // 排除 i, l, o, 0, 1
  let result = ''
  for (let i = 0; i < length; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return result
}
