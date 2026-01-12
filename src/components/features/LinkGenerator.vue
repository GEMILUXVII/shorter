<script setup>
import { ref, computed, watch } from 'vue'
import QRCode from 'qrcode'
import { useLinkStore } from '@/stores/linkStore'
import { useClipboard } from '@/composables/useClipboard'
import { useToast } from '@/composables/useToast'
import { isValidUrl, formatUrl } from '@/utils/validators'
import { useI18n } from 'vue-i18n'
import Button from '@/components/common/Button.vue'

const linkStore = useLinkStore()
const { copy } = useClipboard()
const { success, error } = useToast()
const { t } = useI18n()

const url = ref('')
const customCode = ref('')
const showAdvanced = ref(false)
const isLoading = ref(false)
const generatedLink = ref(null)
const qrCodeUrl = ref('')
const baseUrl = window.location.origin

// 生成二维码（优化：降低分辨率以减少内存使用）
watch(generatedLink, async (newLink) => {
  if (newLink?.shortUrl) {
    try {
      qrCodeUrl.value = await QRCode.toDataURL(newLink.shortUrl, {
        width: 256,  // 从 400 降低到 256，实际显示只需 128px
        margin: 1,
        color: {
          dark: '#7c3aed',
          light: '#00000000'
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
const expiryOption = ref('never')
const password = ref('')
const maxClicks = ref('')
const note = ref('')

const expiryOptions = computed(() => [
  { value: 'never', label: t('link.options.expiryChoices.never') },
  { value: '1d', label: t('link.options.expiryChoices.d1') },
  { value: '7d', label: t('link.options.expiryChoices.d7') },
  { value: '30d', label: t('link.options.expiryChoices.d30') }
])

const urlError = computed(() => {
  if (!url.value) return ''
  const formatted = formatUrl(url.value)
  if (!isValidUrl(formatted)) {
    return t('link.error.invalidUrl')
  }
  return ''
})

const maxClicksError = computed(() => {
  if (!maxClicks.value) return ''
  const num = parseInt(maxClicks.value)
  if (isNaN(num) || num <= 0) {
    return t('link.error.maxClicksInvalid')
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
    success(t('link.success'))
    
    // 清空输入
    url.value = ''
    customCode.value = ''
    expiryOption.value = 'never'
    password.value = ''
    maxClicks.value = ''
    note.value = ''
    showAdvanced.value = false
  } catch (e) {
    if (e.code === 'RESERVED_CODE') {
      error(t('link.error.reservedCode'))
    } else {
      error(e.message || t('link.error.createFailed'))
    }
  } finally {
    isLoading.value = false
  }
}

function handleCopy() {
  if (generatedLink.value) {
    copy(generatedLink.value.shortUrl)
    success(t('link.copied'))
  }
}

function handleReset() {
  generatedLink.value = null
}
</script>

<template>
  <div class="w-full">
    <!-- Hero Section -->
    <section class="relative min-h-[85vh] flex items-center justify-center px-6 py-20 overflow-hidden">
      <!-- 🌟 Stars Background -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="star" style="top: 10%; left: 20%; --duration: 2s; --delay: 0s;" />
        <div class="star" style="top: 15%; left: 80%; --duration: 3s; --delay: 0.5s;" />
        <div class="star" style="top: 30%; left: 10%; --duration: 2.5s; --delay: 1s;" />
        <div class="star" style="top: 25%; left: 90%; --duration: 4s; --delay: 1.5s;" />
        <div class="star" style="top: 60%; left: 5%; --duration: 3.5s; --delay: 0.3s;" />
        <div class="star" style="top: 70%; left: 85%; --duration: 2.8s; --delay: 0.8s;" />
        <div class="star" style="top: 80%; left: 30%; --duration: 3.2s; --delay: 1.2s;" />
        <div class="star" style="top: 45%; left: 95%; --duration: 2.2s; --delay: 0.6s;" />
      </div>

      <!-- 🌊 Ripple Effect -->
      <div class="ripple-bg" />
      
      <!-- Glow Effect Behind -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary)]/15 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      
      <div class="relative max-w-4xl mx-auto w-full z-10">
        <!-- Main Title -->
        <div class="text-center mb-16 opacity-0 animate-fade-in-up" style="animation-fill-mode: forwards;">
          <h1 class="text-5xl sm:text-7xl font-medium tracking-tight text-[var(--foreground)] leading-[1.1] mb-6">
            {{ t('home.title') }}
            <br class="hidden sm:block" />
            <span class="text-gradient font-semibold">beautifully.</span>
          </h1>
          
          <p class="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            {{ t('home.subtitle') }}
          </p>
        </div>

        <!-- URL Input - 带光束效果 -->
        <div 
          class="relative opacity-0 animate-fade-in-up delay-200 max-w-2xl mx-auto"
          style="animation-fill-mode: forwards;"
        >
          <!-- ✨ Animated Border Container -->
          <div class="animated-border p-[2px] rounded-2xl">
            <div class="beam-effect glass-panel bg-[var(--card)] p-2 rounded-2xl flex items-center gap-2 transition-all duration-300 focus-within:ring-1 focus-within:ring-[var(--primary)]/50">
            <div class="flex-1 relative">
              <input
                v-model="url"
                type="text"
                :placeholder="t('link.placeholder')"
                class="w-full h-12 px-4 bg-transparent border-0 text-lg text-[var(--foreground)] placeholder-[var(--muted-foreground)]/50 focus:outline-none focus:ring-0 transition-all font-light tracking-wide"
                @keyup.enter="handleSubmit"
              />
            </div>
            
            <Button
              variant="primary"
              size="lg"
              :loading="isLoading"
              :disabled="!canSubmit"
              class="h-12 px-8 rounded-xl shadow-lg shadow-[var(--primary)]/25 hover:shadow-[var(--primary)]/40 transition-all duration-300 transform hover:scale-[1.02]"
              @click="handleSubmit"
            >
              <template v-if="!isLoading">
                <span class="text-base font-medium tracking-wide">{{ t('link.generate') }}</span>
                <svg class="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </template>
              <template v-else>
                <span>{{ t('link.processing') }}</span>
              </template>
            </Button>
            </div>
          </div>
          
          <!-- Error Message -->
          <Transition name="fade">
            <p v-if="urlError" class="absolute -bottom-8 left-4 text-sm text-[var(--destructive)] font-medium flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ urlError }}
            </p>
          </Transition>

          <!-- Advanced Options Toggle -->
          <div class="mt-6 text-center">
            <button
              type="button"
              class="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-300"
              @click="showAdvanced = !showAdvanced"
            >
              <span>{{ t('link.options.title') }}</span>
              <svg
                class="w-4 h-4 transition-transform duration-300"
                :class="{ 'rotate-180': showAdvanced }"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          
          <!-- Advanced Options -->
          <Transition name="slide-up">
            <div v-if="showAdvanced" class="mt-6 glass-panel p-6 rounded-2xl">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Custom Code -->
                <div class="space-y-2">
                  <label class="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">{{ t('link.options.customCode') }}</label>
                  <div class="flex items-center gap-2 text-sm text-[var(--muted-foreground)] bg-[var(--background)]/20 p-1 rounded-lg border border-white/5 focus-within:border-[var(--primary)]/50 focus-within:bg-[var(--background)]/40 transition-all">
                    <span class="pl-2 shrink-0">{{ baseUrl.replace(/^https?:\/\//, '') }}/</span>
                    <input
                      v-model="customCode"
                      :placeholder="t('link.options.customCodePlaceholder')"
                      class="flex-1 h-8 bg-transparent border-0 focus:ring-0 text-[var(--foreground)] placeholder-[var(--muted-foreground)]/50 p-0"
                    />
                  </div>
                </div>
                
                <!-- Expiry -->
                <div class="space-y-2">
                  <label class="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">{{ t('link.options.expiry') }}</label>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="opt in expiryOptions"
                      :key="opt.value"
                      type="button"
                      class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      :class="[
                        expiryOption === opt.value
                          ? 'bg-[var(--primary)]/20 text-[var(--primary)] ring-1 ring-[var(--primary)]'
                          : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]/50'
                      ]"
                      @click="expiryOption = opt.value"
                    >
                      {{ opt.label }}
                    </button>
                  </div>
                </div>
                
                <!-- Password -->
                <div class="space-y-2">
                  <label class="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">{{ t('link.options.password') }}</label>
                  <input
                    v-model="password"
                    type="password"
                    :placeholder="t('link.options.passwordPlaceholder')"
                    class="w-full h-10 px-3 bg-[var(--background)]/20 text-[var(--foreground)] border border-white/5 rounded-lg focus:outline-none focus:border-[var(--primary)]/50 focus:bg-[var(--background)]/40 transition-all placeholder-[var(--muted-foreground)]/50"
                  />
                </div>

                <!-- Max Clicks -->
                <div class="space-y-2">
                  <label class="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">{{ t('link.options.maxClicks') }}</label>
                  <input
                    v-model="maxClicks"
                    type="number"
                    :placeholder="t('link.options.maxClicksPlaceholder')"
                    class="w-full h-10 px-3 bg-[var(--background)]/20 text-[var(--foreground)] border border-white/5 rounded-lg focus:outline-none focus:border-[var(--primary)]/50 focus:bg-[var(--background)]/40 transition-all placeholder-[var(--muted-foreground)]/50"
                  />
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Result Card -->
        <Transition name="scale">
          <div 
            v-if="generatedLink" 
            class="mt-12 glass-panel p-8 rounded-2xl mx-auto max-w-2xl"
          >
            <div class="flex flex-col lg:flex-row items-center gap-8">
              <!-- Link Info -->
              <div class="flex-1 text-center lg:text-left space-y-4">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-xs font-bold uppercase tracking-wider">
                  <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"/>
                  <span>Generated</span>
                </div>
                
                <a
                  :href="generatedLink.shortUrl"
                  target="_blank"
                  class="block text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/70 hover:to-[var(--primary)] transition-all break-all"
                >
                  {{ generatedLink.shortUrl.replace(/^https?:\/\//, '') }}
                </a>
                
                <p class="text-sm text-[var(--muted-foreground)] truncate max-w-md">
                  <span class="opacity-50 mr-2">Target:</span>
                  {{ generatedLink.originalUrl }}
                </p>

                <div class="flex items-center justify-center lg:justify-start gap-4 pt-4">
                  <Button variant="primary" size="sm" @click="handleCopy" class="shadow-lg shadow-[var(--primary)]/20">
                    <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy Link
                  </Button>
                  <Button variant="ghost" size="sm" @click="handleReset">
                    Create Another
                  </Button>
                </div>
              </div>

              <!-- QR Code -->
              <div v-if="qrCodeUrl" class="shrink-0 p-4 bg-white rounded-xl shadow-xl">
                <img :src="qrCodeUrl" alt="QR Code" class="w-32 h-32" />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </section>
  </div>
</template>

