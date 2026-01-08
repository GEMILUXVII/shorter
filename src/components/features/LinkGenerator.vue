<script setup>
import { ref, computed } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import { useLinkStore } from '@/stores/linkStore'
import { useClipboard } from '@/composables/useClipboard'
import { useToast } from '@/composables/useToast'
import { isValidUrl, formatUrl } from '@/utils/validators'

const linkStore = useLinkStore()
const { copy } = useClipboard()
const { success, error } = useToast()

const url = ref('')
const customCode = ref('')
const showAdvanced = ref(false)
const isLoading = ref(false)
const generatedLink = ref(null)

const urlError = computed(() => {
  if (!url.value) return ''
  const formatted = formatUrl(url.value)
  if (!isValidUrl(formatted)) {
    return '请输入有效的 URL 地址'
  }
  return ''
})

const canSubmit = computed(() => {
  return url.value && !urlError.value && !isLoading.value
})

async function handleSubmit() {
  if (!canSubmit.value) return
  
  isLoading.value = true
  
  try {
    const formattedUrl = formatUrl(url.value)
    const link = linkStore.addLink(formattedUrl, customCode.value || null)
    
    generatedLink.value = link
    success('短链创建成功！')
    
    // 清空输入
    url.value = ''
    customCode.value = ''
    showAdvanced.value = false
  } catch (e) {
    error('创建失败，请重试')
  } finally {
    isLoading.value = false
  }
}

function handleCopy() {
  if (generatedLink.value) {
    copy(generatedLink.value.shortUrl)
  }
}

function handleReset() {
  generatedLink.value = null
}
</script>

<template>
  <div class="w-full max-w-3xl mx-auto">
    <!-- 生成表单 -->
    <BaseCard padding="lg">
      <div class="space-y-8">
        <!-- 标题 -->
        <div class="text-center py-2">
          <h2 class="text-2xl font-bold text-[var(--color-text)]">缩短您的链接</h2>
          <p class="mt-3 text-lg text-[var(--color-text-secondary)]">
            输入长链接，一键生成简洁短链
          </p>
        </div>
        
        <!-- URL 输入 -->
        <BaseInput
          v-model="url"
          type="url"
          placeholder="https://example.com/your-very-long-url..."
          size="lg"
          :error="urlError"
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
            </svg>
          </template>
        </BaseInput>
        
        <!-- 高级选项切换 -->
        <button
          type="button"
          class="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          @click="showAdvanced = !showAdvanced"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 transition-transform"
            :class="{ 'rotate-90': showAdvanced }"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
          高级选项
        </button>
        
        <!-- 高级选项 -->
        <Transition name="slide-up">
          <div v-if="showAdvanced" class="pt-2">
            <BaseInput
              v-model="customCode"
              placeholder="自定义短码（可选，如: my-link）"
              size="md"
              hint="留空将自动生成6位随机短码"
            >
              <template #prefix>
                <span class="text-sm text-[var(--color-text-muted)]">{{ window.location.origin }}/</span>
              </template>
            </BaseInput>
          </div>
        </Transition>
        
        <!-- 提交按钮 -->
        <BaseButton
          variant="primary"
          size="lg"
          block
          :loading="isLoading"
          :disabled="!canSubmit"
          @click="handleSubmit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
          </svg>
          生成短链
        </BaseButton>
      </div>
    </BaseCard>
    
    <!-- 生成结果 -->
    <Transition name="slide-up">
      <BaseCard v-if="generatedLink" padding="md" class="mt-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <!-- 短链信息 -->
          <div class="flex-1 min-w-0">
            <p class="text-sm text-[var(--color-text-secondary)] mb-1">您的短链接已生成</p>
            <a
              :href="generatedLink.shortUrl"
              target="_blank"
              class="text-lg font-medium text-[var(--color-primary)] hover:underline break-all"
            >
              {{ generatedLink.shortUrl }}
            </a>
            <p class="mt-1 text-sm text-[var(--color-text-muted)] truncate">
              原链接: {{ generatedLink.originalUrl }}
            </p>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex items-center gap-2 flex-shrink-0">
            <BaseButton variant="primary" size="sm" @click="handleCopy">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              复制
            </BaseButton>
            <BaseButton variant="ghost" size="sm" @click="handleReset">
              创建新链接
            </BaseButton>
          </div>
        </div>
      </BaseCard>
    </Transition>
  </div>
</template>
