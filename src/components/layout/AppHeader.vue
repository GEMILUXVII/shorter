<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

defineProps({
  isDark: Boolean
})

defineEmits(['toggle-theme'])

const route = useRoute()
const mobileMenuOpen = ref(false)

const navLinks = [
  { name: '首页', path: '/' },
  { name: '管理面板', path: '/dashboard' }
]
</script>

<template>
  <header class="sticky top-0 z-40 bg-[var(--color-card)] border-b border-[var(--color-border)]">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="text-xl font-bold text-[var(--color-text)]">Shorter</span>
        </RouterLink>
        
        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-6">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            :class="[
              'text-sm font-medium transition-colors',
              route.path === link.path
                ? 'text-[var(--color-primary)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            ]"
          >
            {{ link.name }}
          </RouterLink>
        </nav>
        
        <!-- Actions -->
        <div class="flex items-center gap-2">
          <!-- Theme Toggle -->
          <button
            class="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
            @click="$emit('toggle-theme')"
            :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
          >
            <!-- Sun icon -->
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <!-- Moon icon -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
          
          <!-- Mobile menu button -->
          <button
            class="md:hidden p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Nav -->
      <Transition name="slide-up">
        <nav v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-[var(--color-border)]">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            :class="[
              'block py-2 text-sm font-medium transition-colors',
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
</template>
