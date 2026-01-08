<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import AuthModal from '@/components/features/AuthModal.vue'

defineProps({
  isDark: Boolean
})

defineEmits(['toggle-theme'])

const route = useRoute()
const mobileMenuOpen = ref(false)
const showAuthModal = ref(false)
const showUserMenu = ref(false)
const isScrolled = ref(false)

const { user, isLoggedIn, logout } = useAuth()

const navLinks = [
  { name: '首页', path: '/' },
  { name: '管理面板', path: '/dashboard' }
]

function handleLogout() {
  logout()
  showUserMenu.value = false
}

// 滚动监听
import { onMounted, onUnmounted } from 'vue'

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="fixed top-0 w-full z-40 transition-all duration-300" :class="{ 'bg-[var(--color-bg)]/80 backdrop-blur-md shadow-sm': isScrolled, 'bg-transparent': !isScrolled }">
    <div class="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
      <div class="relative flex items-center justify-between h-20">
        <!-- Logo - 纯文字极简风格 -->
        <RouterLink to="/" class="flex items-center gap-2 group">
          <span class="text-2xl font-serif font-bold text-[var(--color-text)] tracking-tight group-hover:text-[var(--color-primary)] transition-colors">Shorter.</span>
        </RouterLink>
        
        <!-- Desktop Nav - 居中纯文本 -->
        <nav class="hidden md:flex items-center gap-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            :class="[
              'text-base font-medium transition-all relative py-1',
              route.path === link.path
                ? 'text-[var(--color-text)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            ]"
          >
            {{ link.name }}
            <!-- 悬停/激活时的微下划线 -->
            <span 
              class="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-primary)] transform origin-left transition-transform duration-300"
              :class="route.path === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
            ></span>
          </RouterLink>
        </nav>
        
        <!-- Actions - 极简图标 -->
        <div class="flex items-center gap-4">
          <!-- Theme Toggle -->
          <button
            class="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            @click="$emit('toggle-theme')"
            :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
          >
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
          
          <!-- Login / User Menu -->
          <div class="relative">
            <template v-if="isLoggedIn">
              <button
                class="flex items-center gap-2 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                @click="showUserMenu = !showUserMenu"
              >
                <span>{{ user?.email?.split('@')[0] }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-50" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <Transition name="fade">
                <div
                  v-if="showUserMenu"
                  class="absolute right-0 mt-4 w-48 bg-[var(--color-card)]/90 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl shadow-lg py-2"
                >
                  <div class="px-4 py-2 text-xs text-[var(--color-text-muted)] border-b border-[var(--color-border)] uppercase tracking-wider">
                    {{ user?.email }}
                  </div>
                  <button
                    class="w-full text-left px-4 py-3 text-sm text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                    @click="handleLogout"
                  >
                    退出登录
                  </button>
                </div>
              </Transition>
            </template>
            
            <template v-else>
              <button
                class="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                @click="showAuthModal = true"
              >
                登录
              </button>
            </template>
          </div>
          
          <!-- Mobile menu button -->
          <button
            class="md:hidden p-2 text-[var(--color-text)]"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Nav -->
      <Transition name="slide-up">
        <nav v-if="mobileMenuOpen" class="md:hidden py-6 bg-[var(--color-bg)]/95 backdrop-blur absolute top-20 left-0 w-full border-t border-[var(--color-border)] shadow-sm px-6">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            :class="[
              'block py-3 text-lg font-serif transition-colors',
              route.path === link.path
                ? 'text-[var(--color-primary)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            ]"
            @click="mobileMenuOpen = false"
          >
            {{ link.name }}
          </RouterLink>
        </nav>
      </Transition>
    </div>
  </header>
  
  <AuthModal :visible="showAuthModal" @close="showAuthModal = false" />
</template>
