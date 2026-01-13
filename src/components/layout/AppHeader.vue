<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import AuthModal from '@/components/features/AuthModal.vue'
import Button from '@/components/common/Button.vue'
import { useI18n } from 'vue-i18n'

defineProps({
  isDark: Boolean
})

defineEmits(['toggle-theme'])

const route = useRoute()
const { t, locale } = useI18n()
const mobileMenuOpen = ref(false)
const showAuthModal = ref(false)
const showUserMenu = ref(false)
const isScrolled = ref(false)
const userMenuRef = ref(null)

const { user, isLoggedIn, logout } = useAuth()

const navLinks = computed(() => [
  { name: t('header.home'), path: '/' },
  { name: t('header.dashboard'), path: '/dashboard' }
])

function handleLogout() {
  logout()
  showUserMenu.value = false
}

function toggleLanguage() {
  const newLang = locale.value === 'zh' ? 'en' : 'zh'
  locale.value = newLang
  localStorage.setItem('user-locale', newLang)
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

// 键盘导航：按 Escape 关闭菜单
function handleKeydown(event) {
  if (event.key === 'Escape') {
    if (showUserMenu.value) {
      showUserMenu.value = false
    }
    if (mobileMenuOpen.value) {
      mobileMenuOpen.value = false
    }
  }
}

// 点击外部关闭用户菜单
function handleClickOutside(event) {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleKeydown)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header
    class="fixed top-0 w-full z-50 transition-[background-color,backdrop-filter,box-shadow] duration-500"
    :class="[
      isScrolled
        ? 'glass-panel border-b-0'
        : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 group">
          <svg class="w-7 h-7 text-[var(--foreground)] transition-transform group-hover:scale-110 duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M24 38h-5a9 9 0 0 1 0-18h5"/>
            <path d="M40 26h5a9 9 0 0 1 0 18h-5"/>
            <path d="M24 32h16"/>
            <path d="M33 18l-8 14h8l-2 14 8-14h-8z"/>
          </svg>
          <span class="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            Shorter
          </span>
        </RouterLink>
        
        <!-- Desktop Nav - Minimalist Style -->
        <nav class="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="relative text-sm font-medium transition-all duration-300"
            :class="[
              route.path === link.path
                ? 'text-[var(--foreground)] text-glow-sm'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:text-glow-sm'
            ]"
          >
            {{ link.name }}
            <!-- Subtle Dot for Active State -->
            <span 
              v-if="route.path === link.path"
              class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]"
            />
          </RouterLink>
        </nav>
        
        <!-- Actions -->
        <div class="flex items-center gap-1">
          <!-- Language Toggle -->
          <Button
            variant="ghost"
            size="sm"
            class="text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            @click="toggleLanguage"
          >
            {{ locale === 'zh' ? 'En' : '中' }}
          </Button>

          <!-- Theme Toggle -->
          <Button
            variant="ghost"
            size="icon"
            @click="$emit('toggle-theme')"
            class="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </Button>
          
          <!-- Login / User Menu -->
          <div class="relative ml-2" ref="userMenuRef">
            <template v-if="isLoggedIn">
              <Button
                variant="ghost"
                class="gap-2 pl-2 pr-4 bg-[var(--secondary)]/50 hover:bg-[var(--secondary)] border border-[var(--border)]/50"
                @click="showUserMenu = !showUserMenu"
                rounded
                :aria-expanded="showUserMenu"
                aria-haspopup="true"
                :aria-label="t('header.userMenuAriaLabel', { user: user?.email })"
              >
                <div class="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] flex items-center justify-center">
                  <span class="text-[10px] font-bold text-white">
                    {{ user?.email?.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <span class="hidden sm:inline text-xs font-medium">{{ user?.email?.split('@')[0] }}</span>
              </Button>

              <Transition name="scale">
                <div
                  v-if="showUserMenu"
                  class="absolute right-0 mt-2 w-56 glass-panel rounded-xl py-1 overflow-hidden origin-top-right z-50"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div class="px-4 py-3 border-b border-[var(--border)]/20">
                    <p class="text-sm font-medium text-[var(--foreground)]">{{ user?.email?.split('@')[0] }}</p>
                    <p class="text-xs text-[var(--muted-foreground)] truncate">{{ user?.email }}</p>
                  </div>
                  <button
                    class="w-full text-left px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--secondary)]/50 transition-colors flex items-center gap-2"
                    role="menuitem"
                    @click="handleLogout"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {{ t('header.logout') }}
                  </button>
                </div>
              </Transition>
            </template>
            
            <template v-else>
              <Button
                variant="primary"
                size="sm"
                rounded
                class="hidden sm:inline-flex shadow-lg shadow-[var(--primary)]/20"
                @click="showAuthModal = true"
              >
                {{ t('header.login') }}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                class="sm:hidden"
                @click="showAuthModal = true"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Button>
            </template>
          </div>
          
          <!-- Mobile menu button -->
          <Button
            variant="ghost"
            size="icon"
            class="md:hidden ml-1"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
      </div>
      
      <!-- Mobile Nav -->
      <Transition name="slide-up">
        <nav 
          v-if="mobileMenuOpen" 
          class="md:hidden py-4 border-t border-[var(--border)]/20 glass-panel mt-2 rounded-xl"
        >
          <div class="space-y-1 p-2">
            <RouterLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="block px-4 py-3 text-base font-medium rounded-lg transition-colors"
              :class="[
                route.path === link.path
                  ? 'text-[var(--primary)] bg-[var(--primary)]/10'
                  : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]/50'
              ]"
              @click="mobileMenuOpen = false"
            >
              {{ link.name }}
            </RouterLink>
          </div>
        </nav>
      </Transition>
    </div>
    
    <AuthModal :visible="showAuthModal" @close="showAuthModal = false" />
  </header>
</template>
