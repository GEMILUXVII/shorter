<script setup>
import { onMounted } from 'vue'
import StatsPanel from '@/components/features/StatsPanel.vue'
import LinkList from '@/components/features/LinkList.vue'
import { useLinkStore } from '@/stores/linkStore'
import { useAuth } from '@/composables/useAuth'
import { useI18n } from 'vue-i18n'

const linkStore = useLinkStore()
const { isLoggedIn } = useAuth()
const { t } = useI18n()

onMounted(() => {
  if (isLoggedIn.value) {
    linkStore.fetchUserLinks()
  }
})
</script>

<template>
  <div class="min-h-screen bg-[var(--background)]">
    <!-- Header Section - 更加简洁 -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-8">
      <div class="max-w-3xl">
        <h1 class="text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight mb-2">
          {{ t('dashboard.title') }}
        </h1>
        <p class="text-base text-[var(--muted-foreground)]">
          {{ t('dashboard.subtitle') }}
        </p>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 pb-12 space-y-8">
      <!-- Stats Panel -->
      <section class="opacity-0 animate-fade-in-up" style="animation-fill-mode: forwards;">
        <StatsPanel />
      </section>
      
      <!-- Popular Links - 更淡化的设计 -->
      <section v-if="linkStore.popularLinks.length > 0" class="opacity-0 animate-fade-in-up delay-100" style="animation-fill-mode: forwards;">
        <div class="p-6 rounded-2xl bg-[var(--secondary)]/30 dark:bg-[var(--secondary)]/20">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <svg class="w-4 h-4 text-amber-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-[var(--foreground)]">{{ t('dashboard.popular') }}</h3>
            </div>
            <span class="text-sm text-[var(--muted-foreground)]">Top {{ linkStore.popularLinks.length }}</span>
          </div>
          
          <div class="space-y-2">
            <div
              v-for="(link, index) in linkStore.popularLinks"
              :key="link.id"
              class="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--background)]/50 dark:hover:bg-[var(--background)]/30 transition-colors group"
            >
              <!-- Rank Badge - 更淡化 -->
              <div
                class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium"
                :class="{
                  'bg-amber-500/20 text-amber-500': index === 0,
                  'bg-slate-400/20 text-slate-400': index === 1,
                  'bg-orange-500/20 text-orange-500': index === 2,
                  'bg-[var(--muted)]/50 text-[var(--muted-foreground)]': index > 2
                }"
              >
                {{ index + 1 }}
              </div>
              
              <!-- Link Info -->
              <div class="flex-1 min-w-0">
                <a
                  :href="link.shortUrl"
                  target="_blank"
                  class="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] truncate block transition-colors"
                >
                  {{ link.shortUrl.replace(/^https?:\/\//, '') }}
                </a>
                <p class="text-xs text-[var(--muted-foreground)] truncate mt-0.5">
                  {{ link.originalUrl }}
                </p>
              </div>
              
              <!-- Clicks - 更简洁 -->
              <div class="flex-shrink-0 flex items-center gap-1.5 text-[var(--muted-foreground)]">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span class="text-sm font-medium">
                  {{ (link.clicks || 0).toLocaleString() }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- All Links - 更淡化 -->
      <section class="opacity-0 animate-fade-in-up delay-200" style="animation-fill-mode: forwards;">
        <div class="p-6 rounded-2xl bg-[var(--secondary)]/30 dark:bg-[var(--secondary)]/20">
          <LinkList />
        </div>
      </section>
    </div>
  </div>
</template>
