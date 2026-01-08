<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import Toast from '@/components/common/Toast.vue'

const isDark = ref(false)

onMounted(() => {
  // 检测系统主题偏好
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = prefersDark
  }
  
  updateTheme()
})

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  updateTheme()
}

function updateTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader :is-dark="isDark" @toggle-theme="toggleTheme" />
    
    <main class="flex-1">
      <router-view />
    </main>
    
    <AppFooter />
    
    <!-- 全局 Toast 组件 -->
    <Toast />
  </div>
</template>
