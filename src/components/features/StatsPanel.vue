<script setup>
import { computed } from 'vue'
import { useLinkStore } from '@/stores/linkStore'
import { useI18n } from 'vue-i18n'

const linkStore = useLinkStore()
const { t } = useI18n()

// 使用 computed 缓存今日链接数计算（避免重复计算）
const todayLinks = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayTimestamp = today.getTime()

  return linkStore.links.filter(link => link.createdAt >= todayTimestamp).length
})

const stats = computed(() => [
  {
    label: t('stats.totalLinks'),
    value: linkStore.totalLinks,
    icon: 'link',
    color: 'blue',
    trend: '+12%'
  },
  {
    label: t('stats.totalClicks'),
    value: linkStore.totalClicks,
    icon: 'cursor',
    color: 'emerald',
    trend: '+8%'
  },
  {
    label: t('stats.todayLinks'),
    value: todayLinks.value,
    icon: 'clock',
    color: 'violet',
    trend: 'Today'
  }
])
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
    <!-- 简洁卡片设计 -->
    <div
      v-for="(stat, index) in stats"
      :key="stat.label"
      class="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
    >
      <div class="flex items-start justify-between">
        <div class="space-y-2">
          <!-- Label -->
          <p class="text-sm text-[var(--muted-foreground)]">
            {{ stat.label }}
          </p>

          <!-- Value - 更大更醒目 -->
          <p class="text-5xl font-bold text-[var(--foreground)] tracking-tight">
            {{ stat.value.toLocaleString() }}
          </p>

          <!-- Trend Badge -->
          <div
            class="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
            :class="{
              'bg-blue-500/10 text-blue-400': stat.color === 'blue',
              'bg-emerald-500/10 text-emerald-400': stat.color === 'emerald',
              'bg-violet-500/10 text-violet-400': stat.color === 'violet'
            }"
          >
            <span class="w-1.5 h-1.5 rounded-full animate-pulse" :class="{
              'bg-blue-400': stat.color === 'blue',
              'bg-emerald-400': stat.color === 'emerald',
              'bg-violet-400': stat.color === 'violet'
            }"/>
            <svg v-if="stat.trend.startsWith('+')" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>{{ stat.trend }}</span>
          </div>
        </div>

        <!-- Icon -->
        <div
          class="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          :class="{
            'bg-blue-500/10 text-blue-400': stat.color === 'blue',
            'bg-emerald-500/10 text-emerald-400': stat.color === 'emerald',
            'bg-violet-500/10 text-violet-400': stat.color === 'violet'
          }"
        >
          <!-- Link Icon -->
          <svg v-if="stat.icon === 'link'" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <!-- Cursor Icon -->
          <svg v-else-if="stat.icon === 'cursor'" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <!-- Clock Icon -->
          <svg v-else-if="stat.icon === 'clock'" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
