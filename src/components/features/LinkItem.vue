<script setup>
import { useClipboard } from '@/composables/useClipboard'
import { truncateText, extractDomain } from '@/utils/validators'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  link: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])

const { copy } = useClipboard()
const { t, locale } = useI18n()

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function handleCopy() {
  copy(props.link.shortUrl)
}

function handleDelete() {
  emit('delete', props.link.id)
}
</script>

<template>
  <article
    class="group flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--background)]/50 dark:hover:bg-[var(--background)]/30 transition-all"
    :aria-label="t('dashboard.item.ariaLabel', { url: link.shortUrl })"
  >
    <!-- Favicon / Domain icon -->
    <div class="flex-shrink-0 w-9 h-9 rounded-lg bg-[var(--secondary)]/50 flex items-center justify-center" aria-hidden="true">
      <img
        :src="`https://www.google.com/s2/favicons?domain=${extractDomain(link.originalUrl)}&sz=32`"
        :alt="extractDomain(link.originalUrl)"
        class="w-4 h-4"
        loading="lazy"
        @error="$event.target.style.display = 'none'"
      />
    </div>

    <!-- Link info -->
    <div class="flex-1 min-w-0">
      <!-- Short URL -->
      <div class="flex items-center gap-2">
        <a
          :href="link.shortUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] truncate transition-colors"
          :aria-label="t('dashboard.item.openLink', { url: link.shortUrl })"
        >
          {{ link.shortUrl.replace(/^https?:\/\//, '') }}
        </a>
        <button
          class="flex-shrink-0 p-1 rounded text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          :title="t('dashboard.item.copy')"
          :aria-label="t('dashboard.item.copyAriaLabel', { url: link.shortUrl })"
          @click="handleCopy"
        >
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        </button>
      </div>

      <!-- Original URL -->
      <a
        :href="link.originalUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="block text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground-secondary)] truncate transition-colors mt-0.5"
        :title="link.originalUrl"
        :aria-label="t('dashboard.item.openOriginal', { url: link.originalUrl })"
      >
        {{ truncateText(link.originalUrl, 60) }}
      </a>
    </div>

    <!-- Stats -->
    <div class="flex-shrink-0 text-right hidden sm:block" aria-label="t('dashboard.item.statsLabel')">
      <div class="flex items-center gap-1 text-sm text-[var(--foreground)]">
        <svg class="h-3.5 w-3.5 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span class="text-xs">{{ t('dashboard.item.clicks', { count: link.clicks || 0 }) }}</span>
      </div>
      <p class="text-xs text-[var(--muted-foreground)] mt-0.5">
        <time :datetime="new Date(link.createdAt).toISOString()">{{ formatDate(link.createdAt) }}</time>
      </p>
    </div>

    <!-- Delete button -->
    <button
      class="flex-shrink-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 focus:opacity-100 text-[var(--muted-foreground)] hover:text-[var(--error)] hover:bg-[var(--error)]/10 transition-all"
      :aria-label="t('dashboard.item.deleteAriaLabel', { url: link.shortUrl })"
      @click="handleDelete"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </article>
</template>
