<script setup>
import StatsPanel from '@/components/features/StatsPanel.vue'
import LinkList from '@/components/features/LinkList.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import { useLinkStore } from '@/stores/linkStore'

const linkStore = useLinkStore()
</script>

<template>
  <div class="py-12 px-6 sm:px-8 lg:px-12">
    <div class="max-w-6xl mx-auto space-y-12">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-3xl font-bold text-[var(--color-text)]">管理面板</h1>
        <p class="mt-3 text-lg text-[var(--color-text-secondary)]">管理和分析您的所有短链接</p>
      </div>
      
      <!-- Stats Panel -->
      <section>
        <StatsPanel />
      </section>
      
      <!-- Popular Links -->
      <section v-if="linkStore.popularLinks.length > 0">
        <BaseCard padding="lg">
          <h3 class="text-xl font-semibold text-[var(--color-text)] mb-6">热门链接</h3>
          <div class="space-y-4">
            <div
              v-for="(link, index) in linkStore.popularLinks"
              :key="link.id"
              class="flex items-center gap-5 p-4 bg-[var(--color-bg-secondary)] rounded-xl"
            >
              <!-- Rank -->
              <div
                :class="[
                  'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg',
                  index === 0 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  index === 1 ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' :
                  index === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                  'bg-[var(--color-card)] text-[var(--color-text-muted)]'
                ]"
              >
                {{ index + 1 }}
              </div>
              
              <!-- Link info -->
              <div class="flex-1 min-w-0">
                <a
                  :href="link.shortUrl"
                  target="_blank"
                  class="text-base font-medium text-[var(--color-primary)] hover:underline truncate block"
                >
                  {{ link.shortUrl.replace(/^https?:\/\//, '') }}
                </a>
                <p class="text-sm text-[var(--color-text-muted)] truncate mt-1">
                  {{ link.originalUrl }}
                </p>
              </div>
              
              <!-- Clicks -->
              <div class="flex-shrink-0 text-right">
                <p class="text-lg font-semibold text-[var(--color-text)]">
                  {{ (link.clicks || 0).toLocaleString() }}
                </p>
                <p class="text-sm text-[var(--color-text-muted)]">点击</p>
              </div>
            </div>
          </div>
        </BaseCard>
      </section>
      
      <!-- All Links -->
      <section>
        <BaseCard padding="lg">
          <LinkList />
        </BaseCard>
      </section>
    </div>
  </div>
</template>
