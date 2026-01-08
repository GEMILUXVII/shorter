<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
import { useClipboard } from '@/composables/useClipboard'
import { truncateText, extractDomain } from '@/utils/validators'

const props = defineProps({
  link: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])

const { copy } = useClipboard()

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('zh-CN', {
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
  <div class="group flex items-center gap-5 p-5 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-primary)] transition-all">
    <!-- Favicon / Domain icon -->
    <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-bg-secondary)] flex items-center justify-center">
      <img
        :src="`https://www.google.com/s2/favicons?domain=${extractDomain(link.originalUrl)}&sz=32`"
        :alt="extractDomain(link.originalUrl)"
        class="w-5 h-5"
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
          class="text-base font-medium text-[var(--color-primary)] hover:underline truncate"
        >
          {{ link.shortUrl.replace(/^https?:\/\//, '') }}
        </a>
        <button
          class="flex-shrink-0 p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] transition-colors"
          title="复制短链"
          @click="handleCopy"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
        </button>
      </div>
      
      <!-- Original URL -->
      <a
        :href="link.originalUrl"
        target="_blank"
        class="block text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] truncate"
        :title="link.originalUrl"
      >
        {{ truncateText(link.originalUrl, 60) }}
      </a>
    </div>
    
    <!-- Stats -->
    <div class="flex-shrink-0 text-right hidden sm:block">
      <div class="flex items-center gap-1 text-sm text-[var(--color-text)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[var(--color-text-muted)]" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
        </svg>
        {{ link.clicks || 0 }} 次点击
      </div>
      <p class="text-xs text-[var(--color-text-muted)] mt-1">
        {{ formatDate(link.createdAt) }}
      </p>
    </div>
    
    <!-- Delete button -->
    <BaseButton
      variant="ghost"
      size="sm"
      class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-error)]"
      @click="handleDelete"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    </BaseButton>
  </div>
</template>
