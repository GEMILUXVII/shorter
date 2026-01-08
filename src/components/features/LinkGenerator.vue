<script setup>
import { ref, computed, watch } from 'vue'
import QRCode from 'qrcode'
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
const qrCodeUrl = ref('')
const baseUrl = window.location.origin

// 生成二维码
watch(generatedLink, async (newLink) => {
  if (newLink?.shortUrl) {
    try {
      qrCodeUrl.value = await QRCode.toDataURL(newLink.shortUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#171717',
          light: '#ffffff'
        }
      })
    } catch (e) {
      console.error('QR Code generation failed:', e)
    }
  } else {
    qrCodeUrl.value = ''
  }
})

// 高级选项
const expiryOption = ref('never') // 1d, 7d, 30d, never
const password = ref('')
const maxClicks = ref('')
const note = ref('')

const expiryOptions = [
  { value: 'never', label: '永不过期' },
  { value: '1d', label: '1 天' },
  { value: '7d', label: '7 天' },
  { value: '30d', label: '30 天' }
]

const urlError = computed(() => {
  if (!url.value) return ''
  const formatted = formatUrl(url.value)
  if (!isValidUrl(formatted)) {
    return '请输入有效的 URL 地址'
  }
  return ''
})

const maxClicksError = computed(() => {
  if (!maxClicks.value) return ''
  const num = parseInt(maxClicks.value)
  if (isNaN(num) || num <= 0) {
    return '访问次数必须是正整数'
  }
  return ''
})

const canSubmit = computed(() => {
  return url.value && !urlError.value && !maxClicksError.value && !isLoading.value
})

async function handleSubmit() {
  if (!canSubmit.value) return
  
  isLoading.value = true
  
  try {
    const formattedUrl = formatUrl(url.value)
    const link = linkStore.addLink(formattedUrl, {
      customCode: customCode.value || null,
      expiresIn: expiryOption.value,
      password: password.value || null,
      maxClicks: maxClicks.value || null,
      note: note.value || null
    })
    
    generatedLink.value = link
    success('短链创建成功！')
    
    // 清空输入
    url.value = ''
    customCode.value = ''
    expiryOption.value = 'never'
    password.value = ''
    maxClicks.value = ''
    note.value = ''
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
          <div v-if="showAdvanced" class="mt-4">
            <div class="p-5 bg-[var(--color-bg-secondary)] rounded-xl space-y-5">
              <!-- 自定义短码 -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-[var(--color-text)]">自定义短码</label>
                <div class="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-2">
                  <code class="px-2 py-1 bg-[var(--color-card)] rounded text-[var(--color-primary)] font-mono">{{ baseUrl }}/</code>
                  <span>+ 你的短码</span>
                </div>
                <BaseInput
                  v-model="customCode"
                  placeholder="留空自动生成6位随机码"
                  size="md"
                />
              </div>
              
              <!-- 有效期 -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-[var(--color-text)]">有效期</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="opt in expiryOptions"
                    :key="opt.value"
                    type="button"
                    :class="[
                      'px-4 py-2 rounded-lg text-sm transition-colors',
                      expiryOption === opt.value
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-card)] text-[var(--color-text-secondary)] hover:bg-[var(--color-card-hover)]'
                    ]"
                    @click="expiryOption = opt.value"
                  >
                    {{ opt.label }}
                  </button>
                </div>
              </div>
              
              <!-- 密码保护 -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-[var(--color-text)]">密码保护</label>
                <BaseInput
                  v-model="password"
                  type="password"
                  placeholder="设置访问密码（可选）"
                  size="md"
                />
              </div>
              
              <!-- 访问限制 -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-[var(--color-text)]">访问次数限制</label>
                <input
                  v-model="maxClicks"
                  type="number"
                  min="1"
                  placeholder="不限制则留空"
                  :class="[
                    'w-full px-4 py-3 bg-[var(--color-card)] border rounded-lg text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:border-transparent',
                    maxClicksError ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]' : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'
                  ]"
                />
                <p v-if="maxClicksError" class="text-sm text-[var(--color-error)]">
                  {{ maxClicksError }}
                </p>
              </div>
              
              <!-- 备注 -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-[var(--color-text)]">备注</label>
                <textarea
                  v-model="note"
                  placeholder="添加链接备注（可选）"
                  rows="2"
                  class="w-full px-4 py-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
                />
              </div>
            </div>
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
        <div class="flex flex-col sm:flex-row gap-6">
          <!-- 二维码 -->
          <div v-if="qrCodeUrl" class="flex-shrink-0 flex justify-center sm:justify-start">
            <div class="p-3 bg-white rounded-xl shadow-sm">
              <img :src="qrCodeUrl" alt="QR Code" class="w-32 h-32" />
            </div>
          </div>
          
          <!-- 短链信息 -->
          <div class="flex-1 min-w-0 flex flex-col justify-between">
            <div>
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
            <div class="flex items-center gap-2 mt-4">
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
        </div>
      </BaseCard>
    </Transition>
  </div>
</template>
