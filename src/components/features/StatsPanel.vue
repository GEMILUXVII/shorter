<script setup>
import { computed } from 'vue'
import BaseCard from '@/components/common/BaseCard.vue'
import { useLinkStore } from '@/stores/linkStore'

const linkStore = useLinkStore()

const stats = computed(() => [
  {
    label: '总链接数',
    value: linkStore.totalLinks,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>`,
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
  },
  {
    label: '总点击量',
    value: linkStore.totalClicks,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>`,
    color: 'text-green-500 bg-green-50 dark:bg-green-900/20'
  },
  {
    label: '今日新增',
    value: todayLinks(),
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`,
    color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20'
  }
])

function todayLinks() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayTimestamp = today.getTime()
  
  return linkStore.links.filter(link => link.createdAt >= todayTimestamp).length
}
</script>

<template>
  <BaseCard padding="lg">
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-around gap-6 sm:gap-8">
      <div
        v-for="(stat, index) in stats"
        :key="stat.label"
        class="flex items-center gap-4 flex-1"
        :class="{ 'sm:border-r sm:border-[var(--color-border)] sm:pr-8': index < stats.length - 1 }"
      >
        <!-- Icon -->
        <div
          :class="[
            'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
            stat.color
          ]"
          v-html="stat.icon"
        />
        
        <!-- Content -->
        <div>
          <p class="text-3xl font-bold text-[var(--color-text)]">
            {{ stat.value.toLocaleString() }}
          </p>
          <p class="text-sm text-[var(--color-text-secondary)]">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
