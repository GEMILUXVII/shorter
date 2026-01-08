<script setup>
import { ref, computed } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import LinkItem from './LinkItem.vue'
import { useLinkStore } from '@/stores/linkStore'
import { useToast } from '@/composables/useToast'

const linkStore = useLinkStore()
const { success } = useToast()

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
  success('链接已删除')
}

function handleClearAll() {
  if (confirm('确定要删除所有链接吗？此操作不可恢复。')) {
    linkStore.clearAll()
    success('所有链接已删除')
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h3 class="text-xl font-semibold text-[var(--color-text)]">我的短链</h3>
        <p class="text-sm text-[var(--color-text-secondary)]">
          共 {{ linkStore.totalLinks }} 条链接
        </p>
      </div>
      
      <div class="flex items-center gap-2 w-full sm:w-auto">
        <!-- Search -->
        <BaseInput
          v-model="searchQuery"
          placeholder="搜索链接..."
          size="sm"
          class="flex-1 sm:w-64"
        >
          <template #prefix>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </template>
        </BaseInput>
        
        <!-- Clear all -->
        <BaseButton
          v-if="!isEmpty"
          variant="ghost"
          size="sm"
          class="flex-shrink-0 text-[var(--color-error)]"
          @click="handleClearAll"
        >
          清空
        </BaseButton>
      </div>
    </div>
    
    <!-- Links list -->
    <div v-if="!isEmpty" class="space-y-4">
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
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="mt-4 text-[var(--color-text-secondary)]">
          未找到匹配 "{{ searchQuery }}" 的链接
        </p>
      </div>
    </div>
    
    <!-- Empty state -->
    <div v-else class="py-16 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
      <h4 class="mt-4 text-lg font-medium text-[var(--color-text)]">
        还没有创建任何短链
      </h4>
      <p class="mt-2 text-[var(--color-text-secondary)]">
        前往首页创建您的第一个短链接
      </p>
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
        创建短链
      </RouterLink>
    </div>
  </div>
</template>
