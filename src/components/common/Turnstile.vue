<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  siteKey: {
    type: String,
    default: () => import.meta.env.VITE_TURNSTILE_SITE_KEY || ''
  },
  theme: {
    type: String,
    default: 'auto', // 'light', 'dark', 'auto'
    validator: (v) => ['light', 'dark', 'auto'].includes(v)
  },
  size: {
    type: String,
    default: 'normal', // 'normal', 'compact'
    validator: (v) => ['normal', 'compact'].includes(v)
  }
})

const emit = defineEmits(['verify', 'expire', 'error'])

const containerRef = ref(null)
const widgetId = ref(null)
const isLoaded = ref(false)

// 加载 Turnstile 脚本
function loadScript() {
  if (window.turnstile) {
    isLoaded.value = true
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = () => {
      isLoaded.value = true
      resolve()
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// 渲染 Turnstile widget
function renderWidget() {
  if (!window.turnstile || !containerRef.value || !props.siteKey) return

  // 如果已经渲染过，先移除
  if (widgetId.value) {
    window.turnstile.remove(widgetId.value)
  }

  widgetId.value = window.turnstile.render(containerRef.value, {
    sitekey: props.siteKey,
    theme: props.theme,
    size: props.size,
    callback: (token) => {
      emit('verify', token)
    },
    'expired-callback': () => {
      emit('expire')
    },
    'error-callback': (error) => {
      emit('error', error)
    }
  })
}

// 重置 widget
function reset() {
  if (window.turnstile && widgetId.value) {
    window.turnstile.reset(widgetId.value)
  }
}

// 暴露 reset 方法给父组件
defineExpose({ reset })

onMounted(async () => {
  try {
    await loadScript()
    renderWidget()
  } catch (e) {
    console.error('Failed to load Turnstile:', e)
    emit('error', e)
  }
})

onUnmounted(() => {
  if (window.turnstile && widgetId.value) {
    window.turnstile.remove(widgetId.value)
  }
})

// 监听 siteKey 变化
watch(() => props.siteKey, () => {
  if (isLoaded.value) {
    renderWidget()
  }
})
</script>

<template>
  <div ref="containerRef" class="turnstile-container" />
</template>

<style scoped>
.turnstile-container {
  display: flex;
  justify-content: center;
}
</style>
