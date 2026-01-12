import { describe, it, expect } from 'vitest'
import { isValidUrl, isValidCode, formatUrl, extractDomain, truncateText } from './validators'

describe('isValidUrl', () => {
  it('should return true for valid http URLs', () => {
    expect(isValidUrl('http://example.com')).toBe(true)
    expect(isValidUrl('http://www.example.com')).toBe(true)
    expect(isValidUrl('http://example.com/path')).toBe(true)
  })

  it('should return true for valid https URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
    expect(isValidUrl('https://www.example.com')).toBe(true)
    expect(isValidUrl('https://example.com/path?query=1')).toBe(true)
  })

  it('should return true for IP addresses', () => {
    expect(isValidUrl('http://192.168.1.1')).toBe(true)
    expect(isValidUrl('https://10.0.0.1:8080')).toBe(true)
  })

  it('should return false for invalid protocols', () => {
    expect(isValidUrl('ftp://example.com')).toBe(false)
    expect(isValidUrl('javascript:alert(1)')).toBe(false)
    expect(isValidUrl('file:///etc/passwd')).toBe(false)
  })

  it('should return false for URLs without domain', () => {
    expect(isValidUrl('http://localhost')).toBe(false)
    expect(isValidUrl('https://test')).toBe(false)
  })

  it('should return false for invalid hostnames', () => {
    expect(isValidUrl('https://.example.com')).toBe(false)
    expect(isValidUrl('https://example.')).toBe(false)
    expect(isValidUrl('https://exam ple.com')).toBe(false)
  })

  it('should return false for empty or invalid input', () => {
    expect(isValidUrl('')).toBe(false)
    expect(isValidUrl(null)).toBe(false)
    expect(isValidUrl(undefined)).toBe(false)
    expect(isValidUrl(123)).toBe(false)
    expect(isValidUrl('not a url')).toBe(false)
  })

  it('should return true for subdomains', () => {
    expect(isValidUrl('https://sub.example.com')).toBe(true)
    expect(isValidUrl('https://a.b.c.example.com')).toBe(true)
  })

  it('should return true for international TLDs', () => {
    expect(isValidUrl('https://example.co.uk')).toBe(true)
    expect(isValidUrl('https://example.com.cn')).toBe(true)
  })
})

describe('isValidCode', () => {
  it('should return true for valid codes (4-10 alphanumeric)', () => {
    expect(isValidCode('abcd')).toBe(true)
    expect(isValidCode('ABCD')).toBe(true)
    expect(isValidCode('1234')).toBe(true)
    expect(isValidCode('abc123')).toBe(true)
    expect(isValidCode('abcdefghij')).toBe(true) // 10 chars
  })

  it('should return false for codes too short', () => {
    expect(isValidCode('abc')).toBe(false)
    expect(isValidCode('ab')).toBe(false)
    expect(isValidCode('a')).toBe(false)
  })

  it('should return false for codes too long', () => {
    expect(isValidCode('abcdefghijk')).toBe(false) // 11 chars
    expect(isValidCode('abcdefghijklmnop')).toBe(false)
  })

  it('should return false for codes with special characters', () => {
    expect(isValidCode('abc-def')).toBe(false)
    expect(isValidCode('abc_def')).toBe(false)
    expect(isValidCode('abc.def')).toBe(false)
    expect(isValidCode('abc def')).toBe(false)
    expect(isValidCode('abc!def')).toBe(false)
  })

  it('should return false for empty or invalid input', () => {
    expect(isValidCode('')).toBe(false)
    expect(isValidCode(null)).toBe(false)
    expect(isValidCode(undefined)).toBe(false)
    expect(isValidCode(12345)).toBe(false)
  })
})

describe('formatUrl', () => {
  it('should add https:// to URLs without protocol', () => {
    expect(formatUrl('example.com')).toBe('https://example.com')
    expect(formatUrl('www.example.com')).toBe('https://www.example.com')
  })

  it('should preserve existing http:// protocol', () => {
    expect(formatUrl('http://example.com')).toBe('http://example.com')
  })

  it('should preserve existing https:// protocol', () => {
    expect(formatUrl('https://example.com')).toBe('https://example.com')
  })

  it('should trim whitespace', () => {
    expect(formatUrl('  example.com  ')).toBe('https://example.com')
    expect(formatUrl('  https://example.com  ')).toBe('https://example.com')
  })

  it('should return empty string for empty input', () => {
    expect(formatUrl('')).toBe('')
    expect(formatUrl(null)).toBe('')
    expect(formatUrl(undefined)).toBe('')
  })
})

describe('extractDomain', () => {
  it('should extract domain from valid URLs', () => {
    expect(extractDomain('https://example.com')).toBe('example.com')
    expect(extractDomain('https://www.example.com/path')).toBe('www.example.com')
    expect(extractDomain('http://sub.example.com:8080/path?query=1')).toBe('sub.example.com')
  })

  it('should return original string for invalid URLs', () => {
    expect(extractDomain('not a url')).toBe('not a url')
    expect(extractDomain('example.com')).toBe('example.com')
  })
})

describe('truncateText', () => {
  it('should not truncate text shorter than max length', () => {
    expect(truncateText('hello', 10)).toBe('hello')
    expect(truncateText('hello world', 50)).toBe('hello world')
  })

  it('should truncate text longer than max length', () => {
    expect(truncateText('hello world', 5)).toBe('hello...')
    expect(truncateText('this is a long text', 10)).toBe('this is a ...')
  })

  it('should use default max length of 50', () => {
    const longText = 'a'.repeat(60)
    expect(truncateText(longText)).toBe('a'.repeat(50) + '...')
  })

  it('should handle empty or null input', () => {
    expect(truncateText('')).toBe('')
    expect(truncateText(null)).toBe(null)
    expect(truncateText(undefined)).toBe(undefined)
  })
})
