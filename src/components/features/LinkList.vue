<script setup>
import { ref, computed } from 'vue'
import LinkItem from './LinkItem.vue'
import { useLinkStore } from '@/stores/linkStore'
import { useToast } from '@/composables/useToast'
import { useI18n } from 'vue-i18n'

const linkStore = useLinkStore()
const { success } = useToast()
const { t } = useI18n()

const searchQuery = ref('')

const filteredLinks = computed(() => {
  if (!searchQuery.value) {
    return linkStore.links
  }
  
  const query = searchQuery.value.toLowerCase()
  return linkStore.links.filter(link => 
    link.originalUrl.toLowerCase().includes(query) ||
    link.code.toLowerCase().includes(query) ||
    link.shortUrl.toLowerCase().includes(query)
  )
})

const isEmpty = computed(() => linkStore.links.length === 0)
const hasSearchResults = computed(() => filteredLinks.value.length > 0)

function handleDelete(id) {
  linkStore.removeLink(id)
  success(t('dashboard.list.deleteSuccess'))
}

function handleClearAll() {
  if (confirm(t('dashboard.list.deleteConfirm'))) {
    linkStore.clearAll()
    success(t('dashboard.list.clearSuccess'))
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h3 class="text-lg font-semibold text-[var(--foreground)]">{{ t('dashboard.list.title') }}</h3>
        <p class="text-sm text-[var(--muted-foreground)]">
          {{ t('dashboard.list.total', { count: linkStore.totalLinks }) }}
        </p>
      </div>
      
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <!-- Search -->
        <div class="relative flex-1 sm:w-64">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            :placeholder="t('dashboard.list.search')"
            class="w-full h-9 pl-9 pr-3 text-sm bg-[var(--background)]/50 dark:bg-[var(--background)]/30 rounded-lg text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]/50 transition-all"
          />
        </div>
        
        <!-- Clear all -->
        <button
          v-if="!isEmpty"
          class="flex-shrink-0 text-sm text-[var(--muted-foreground)] hover:text-[var(--error)] transition-colors"
          @click="handleClearAll"
        >
          {{ t('dashboard.list.clear') }}
        </button>
      </div>
    </div>
    
    <!-- Links list -->
    <div v-if="!isEmpty" class="space-y-2">
      <TransitionGroup name="list">
        <LinkItem
          v-for="link in filteredLinks"
          :key="link.id"
          :link="link"
          @delete="handleDelete"
        />
      </TransitionGroup>
      
      <!-- No search results -->
      <div
        v-if="!hasSearchResults && searchQuery"
        class="py-12 text-center"
      >
        <svg class="h-10 w-10 mx-auto text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="mt-3 text-sm text-[var(--muted-foreground)]">
          {{ t('dashboard.list.noMatch', { query: searchQuery }) }}
        </p>
      </div>
    </div>
    
    <!-- Empty state -->
    <div v-else class="py-16 text-center">
      <svg class="h-12 w-12 mx-auto text-[var(--muted-foreground)]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
      <h4 class="mt-4 text-base font-medium text-[var(--foreground)]">
        {{ t('dashboard.empty.title') }}
      </h4>
      <p class="mt-1 text-sm text-[var(--muted-foreground)]">
        {{ t('dashboard.empty.desc') }}
      </p>
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm font-medium bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
      >
        {{ t('dashboard.empty.button') }}
      </RouterLink>
    </div>
  </div>
</template>
