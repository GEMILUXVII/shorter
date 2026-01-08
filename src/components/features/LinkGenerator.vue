<script setup>
import { ref, computed, watch } from 'vue'
import QRCode from 'qrcode'
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
        width: 400,
        margin: 2,
        color: {
          dark: '#5c8d89', // 使用主题色
          light: '#00000000' // 透明背景
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
    const link = await linkStore.addLink(formattedUrl, {
      customCode: customCode.value || null,
      expiresIn: expiryOption.value,
      password: password.value || null,
      maxClicks: maxClicks.value || null,
      note: note.value || null
    })
    
    generatedLink.value = link
    success('短链创建成功')
    
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
    success('已复制到剪贴板')
  }
}

function handleReset() {
  generatedLink.value = null
}
</script>

<template>
  <div class="w-full max-w-4xl mx-auto px-4 py-8 md:py-16">
    <!-- 主标题区 - 增加呼吸感 -->
    <section class="text-center mb-16 animate-fade-in-up">
      <h1 class="text-4xl md:text-5xl font-serif text-[var(--color-text)] mb-6">
        Simplify your links, <span class="text-[var(--color-primary)] italic">beautifully.</span>
      </h1>
      <p class="text-lg text-[var(--color-text-secondary)] font-light">
        输入长链接，生成简洁、优雅的短链接。
      </p>
    </section>

    <!-- 极简输入区 -->
    <div class="relative max-w-2xl mx-auto mb-12 animate-fade-in-up" style="animation-delay: 0.1s">
      <div class="relative group">
        <input
          v-model="url"
          type="text"
          placeholder="在此粘贴您的长链接..."
          class="clean-input text-center md:text-2xl py-6 border-b-2 placeholder-[var(--color-text-muted)] group-hover:border-[var(--color-primary-light)] focus:border-[var(--color-primary)] transition-colors"
          @keyup.enter="handleSubmit"
        />
        <!-- 错误提示 -->
        <div v-if="urlError" class="absolute -bottom-8 left-0 w-full text-center text-[var(--color-error)] text-sm">
          {{ urlError }}
        </div>
      </div>
    
      <!-- 提交按钮 -->
      <div class="mt-12 text-center">
        <button
          class="clean-btn text-lg px-10 py-3 md:text-xl md:px-12 md:py-4 shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40"
          :disabled="!canSubmit"
          @click="handleSubmit"
        >
          <span v-if="isLoading" class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            处理中...
          </span>
          <span v-else>立即生成</span>
        </button>
      </div>

      <!-- 高级选项开关 -->
      <div class="mt-8 text-center">
        <button
          type="button"
          class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors flex items-center justify-center gap-1 mx-auto"
          @click="showAdvanced = !showAdvanced"
        >
          <span>更多选项</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 transition-transform duration-300"
            :class="{ 'rotate-180': showAdvanced }"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <!-- 高级选项内容 -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div v-if="showAdvanced" class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left bg-[var(--color-bg-secondary)]/50 p-8 rounded-3xl">
          <!-- 自定义短码 -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-[var(--color-text-secondary)]">自定义后缀</label>
            <div class="flex items-center gap-2">
              <span class="text-[var(--color-text-muted)] font-serif italic">{{ baseUrl.replace(/^https?:\/\//, '') }}/</span>
              <input
                v-model="customCode"
                placeholder="random"
                class="clean-input !text-base !py-1 !border-b !w-full"
              />
            </div>
          </div>
          
          <!-- 有效期 -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-[var(--color-text-secondary)]">有效期</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="opt in expiryOptions"
                :key="opt.value"
                type="button"
                :class="[
                  'px-3 py-1 rounded-full text-sm transition-all border',
                  expiryOption === opt.value
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/5'
                    : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                ]"
                @click="expiryOption = opt.value"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>
          
          <!-- 密码保护 -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-[var(--color-text-secondary)]">访问密码</label>
            <input
              v-model="password"
              type="password"
              placeholder="可选"
              class="clean-input !text-base !py-1 !border-b"
            />
          </div>

          <!-- 访问限制 -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-[var(--color-text-secondary)]">最大访问次数</label>
            <input
              v-model="maxClicks"
              type="number"
              placeholder="无限制"
              class="clean-input !text-base !py-1 !border-b"
            />
          </div>
        </div>
      </Transition>
    </div>

    <!-- 结果展示区 - 极简风格 -->
    <Transition name="fade">
      <div v-if="generatedLink" class="mt-20 max-w-3xl mx-auto animate-fade-in-up border-t border-[var(--color-border)] pt-12">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <!-- 左侧：链接信息 -->
          <div class="flex-1 text-center md:text-left space-y-4">
            <div class="space-y-1">
              <p class="text-sm text-[var(--color-text-muted)] uppercase tracking-wide">Short Link Generated</p>
              <a
                :href="generatedLink.shortUrl"
                target="_blank"
                class="text-3xl md:text-4xl font-serif text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors break-all"
              >
                {{ generatedLink.shortUrl.replace(/^https?:\/\//, '') }}
              </a>
            </div>
            
            <p class="text-[var(--color-text-secondary)] truncate text-sm px-4 md:px-0">
              <span class="opacity-50">Original:</span> {{ generatedLink.originalUrl }}
            </p>

            <div class="flex items-center justify-center md:justify-start gap-4 mt-6">
              <button
                class="clean-btn text-sm px-6 py-2"
                @click="handleCopy"
              >
                复制链接
              </button>
              <button
                class="clean-btn ghost text-sm px-6 py-2"
                @click="handleReset"
              >
                再来一个
              </button>
            </div>
          </div>

          <!-- 右侧：极简二维码 -->
          <div v-if="qrCodeUrl" class="flex-shrink-0">
            <div class="p-4 bg-white rounded-2xl shadow-[var(--shadow-sm)]">
              <img :src="qrCodeUrl" alt="QR Code" class="w-32 h-32 opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
