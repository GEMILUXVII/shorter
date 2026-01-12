<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useToast } from '@/composables/useToast'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  visible: Boolean
})

const emit = defineEmits(['close'])

const { register, login, isLoading } = useAuth()
const { success, error: showError } = useToast()
const { t } = useI18n()

const mode = ref('login') // 'login' or 'register'
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')

const isRegister = computed(() => mode.value === 'register')

const passwordError = computed(() => {
  if (isRegister.value && password.value && password.value.length < 6) {
    return t('auth.passwordError')
  }
  return ''
})

const confirmError = computed(() => {
  if (isRegister.value && confirmPassword.value && confirmPassword.value !== password.value) {
    return t('auth.passwordMismatch')
  }
  return ''
})

const canSubmit = computed(() => {
  if (!email.value || !password.value) return false
  if (passwordError.value) return false
  if (isRegister.value && confirmError.value) return false
  return true
})

async function handleSubmit() {
  if (!canSubmit.value) return
  
  errorMsg.value = ''
  
  let result
  if (isRegister.value) {
    result = await register(email.value, password.value)
  } else {
    result = await login(email.value, password.value)
  }
  
  if (result.success) {
    success(isRegister.value ? t('auth.toast.registerSuccess') : t('auth.toast.loginSuccess'))
    handleClose()
  } else {
    errorMsg.value = result.error
    showError(result.error)
  }
}

function handleClose() {
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  errorMsg.value = ''
  emit('close')
}

function switchMode() {
  mode.value = isRegister.value ? 'login' : 'register'
  errorMsg.value = ''
}
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop - 独立过渡 -->
      <Transition name="backdrop">
        <div
          v-if="visible"
          class="absolute inset-0 bg-black/50 backdrop-blur-md"
          @click="handleClose"
        />
      </Transition>

      <!-- Modal - 独立过渡 -->
      <Transition name="modal">
        <div v-if="visible" class="relative w-full max-w-md">
          <!-- 卡片主体 -->
          <div class="relative bg-[var(--card)] backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 p-8 md:p-10 border border-white/20 dark:border-white/10">
            <!-- Header -->
            <div class="text-center mb-10">
              <h2 class="text-3xl font-serif font-medium text-[var(--foreground)]">
                {{ isRegister ? t('auth.join') : t('auth.welcome') }}
              </h2>
              <p class="mt-2 text-[var(--muted-foreground)] font-light">
                {{ isRegister ? t('auth.joinDesc') : t('auth.welcomeDesc') }}
              </p>
            </div>
            
            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-5">
              <div>
                <input
                  v-model="email"
                  type="email"
                  :placeholder="t('auth.emailPlaceholder')"
                  class="w-full h-12 px-4 text-base bg-[var(--secondary)]/50 dark:bg-white/5 border border-[var(--border)] dark:border-white/10 rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                  required
                />
              </div>

              <div class="space-y-1">
                <input
                  v-model="password"
                  type="password"
                  :placeholder="t('auth.password')"
                  class="w-full h-12 px-4 text-base bg-[var(--secondary)]/50 dark:bg-white/5 border border-[var(--border)] dark:border-white/10 rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                  required
                />
                <p v-if="passwordError" class="text-sm text-[var(--destructive)] text-right">{{ passwordError }}</p>
              </div>

              <Transition name="slide-up">
                <div v-if="isRegister" class="space-y-1">
                  <input
                    v-model="confirmPassword"
                    type="password"
                    :placeholder="t('auth.confirmPassword')"
                    class="w-full h-12 px-4 text-base bg-[var(--secondary)]/50 dark:bg-white/5 border border-[var(--border)] dark:border-white/10 rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                    required
                  />
                  <p v-if="confirmError" class="text-sm text-[var(--destructive)] text-right">{{ confirmError }}</p>
                </div>
              </Transition>

              <!-- Error message -->
              <div v-if="errorMsg" class="p-3 bg-[var(--destructive)]/10 border border-[var(--destructive)]/20 rounded-xl">
                <p class="text-sm text-[var(--destructive)] text-center">{{ errorMsg }}</p>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                class="w-full h-12 text-base font-medium bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[var(--primary)]/25 border border-white/10"
                :disabled="!canSubmit || isLoading"
              >
                <span v-if="isLoading" class="animate-pulse">{{ t('auth.submit.processing') }}</span>
                <span v-else>{{ isRegister ? t('auth.submit.register') : t('auth.submit.login') }}</span>
              </button>
            </form>
            
            <!-- Footer -->
            <div class="mt-8 text-center text-sm text-[var(--muted-foreground)]">
              {{ isRegister ? t('auth.switch.hasAccount') : t('auth.switch.noAccount') }}
              <button
                type="button"
                class="text-[var(--primary)] font-medium hover:underline ml-1"
                @click="switchMode"
              >
                {{ isRegister ? t('auth.switch.toLogin') : t('auth.switch.toRegister') }}
              </button>
            </div>

            <!-- Close button -->
            <button
              type="button"
              class="absolute top-4 right-4 p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              @click="handleClose"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
/* Backdrop 过渡 - 背景模糊立即生效 */
.backdrop-enter-active {
  transition: opacity 0.2s ease;
}
.backdrop-leave-active {
  transition: opacity 0.3s ease 0.1s;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* Modal 过渡 - 卡片弹出动画 */
.modal-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-leave-active {
  transition: all 0.2s ease;
}
.modal-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
.modal-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
  max-height: 100px;
  overflow: hidden;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}
</style>
