<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useToast } from '@/composables/useToast'

defineProps({
  visible: Boolean
})

const emit = defineEmits(['close'])

const { register, login, isLoading } = useAuth()
const { success, error: showError } = useToast()

const mode = ref('login') // 'login' or 'register'
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')

const isRegister = computed(() => mode.value === 'register')

const passwordError = computed(() => {
  if (isRegister.value && password.value && password.value.length < 6) {
    return '密码至少6位'
  }
  return ''
})

const confirmError = computed(() => {
  if (isRegister.value && confirmPassword.value && confirmPassword.value !== password.value) {
    return '两次密码不一致'
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
    success(isRegister.value ? '注册成功！' : '登录成功！')
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
    <Transition name="fade">
      <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-[var(--color-text)]/20 backdrop-blur-sm"
          @click="handleClose"
        />
        
        <!-- Modal -->
        <div class="relative w-full max-w-md animate-fade-in-up">
          <!-- 卡片主体 - 极简浮动风格 -->
          <div class="relative bg-[var(--color-bg)]/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50">
            <!-- Header -->
            <div class="text-center mb-10">
              <h2 class="text-3xl font-serif font-medium text-[var(--color-text)]">
                {{ isRegister ? 'Join Shorter' : 'Welcome Back' }}
              </h2>
              <p class="mt-2 text-[var(--color-text-secondary)] font-light">
                {{ isRegister ? 'Start simplifying your links today.' : 'Login to manage your links.' }}
              </p>
            </div>
            
            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="space-y-1">
                <input
                  v-model="email"
                  type="email"
                  placeholder="name@example.com"
                  class="clean-input !text-base bg-transparent"
                  required
                />
              </div>
              
              <div class="space-y-1">
                <input
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  class="clean-input !text-base bg-transparent"
                  required
                />
                <p v-if="passwordError" class="text-sm text-[var(--color-error)] text-right">{{ passwordError }}</p>
              </div>
              
              <Transition name="slide-up">
                <div v-if="isRegister" class="space-y-1">
                  <input
                    v-model="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    class="clean-input !text-base bg-transparent"
                    required
                  />
                  <p v-if="confirmError" class="text-sm text-[var(--color-error)] text-right">{{ confirmError }}</p>
                </div>
              </Transition>
              
              <!-- Error message -->
              <div v-if="errorMsg" class="p-3 bg-[var(--color-error)]/10 rounded-lg">
                <p class="text-sm text-[var(--color-error)] text-center">{{ errorMsg }}</p>
              </div>
              
              <!-- Submit -->
              <button
                type="submit"
                class="clean-btn w-full text-lg py-3 mt-4 shadow-lg shadow-[var(--color-primary)]/20"
                :disabled="!canSubmit || isLoading"
              >
                <span v-if="isLoading" class="animate-pulse">Processing...</span>
                <span v-else>{{ isRegister ? 'Create Account' : 'Sign In' }}</span>
              </button>
            </form>
            
            <!-- Footer -->
            <div class="mt-8 text-center text-sm text-[var(--color-text-muted)]">
              {{ isRegister ? 'Already have an account?' : "Don't have an account?" }}
              <button
                type="button"
                class="text-[var(--color-primary)] font-medium hover:underline ml-1"
                @click="switchMode"
              >
                {{ isRegister ? 'Log in' : 'Sign up' }}
              </button>
            </div>
            
            <!-- Close button -->
            <button
              type="button"
              class="absolute top-4 right-4 p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              @click="handleClose"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
