import { createI18n } from 'vue-i18n'
import zh from './locales/zh'
import en from './locales/en'

// 获取浏览器语言或本地存储的语言偏好
function getBrowserLanguage() {
  const storedLang = localStorage.getItem('user-locale')
  if (storedLang) {
    return storedLang
  }
  
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.includes('zh')) {
    return 'zh'
  }
  return 'en'
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: getBrowserLanguage(),
  fallbackLocale: 'en',
  messages: {
    zh,
    en
  }
})

export default i18n
