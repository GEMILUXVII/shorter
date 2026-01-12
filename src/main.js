import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import i18n from './i18n'
import App from './App.vue'
import './style.css'

const app = createApp(App)

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue Error:', err)
  console.error('Component:', instance?.$options?.name || 'Unknown')
  console.error('Info:', info)

  // 可以在这里添加错误上报逻辑，如 Sentry
  // if (import.meta.env.PROD) {
  //   Sentry.captureException(err, { extra: { info } })
  // }
}

// 未捕获的 Promise 错误
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason)
})

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
