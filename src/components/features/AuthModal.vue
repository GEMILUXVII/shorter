<script setup>
import { ref, computed } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { useAuth } from '@/composables/useAuth'
import { useToast } from '@/composables/useToast'

const props = defineProps({
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
          class="absolute inset-0 bg-black/70 backdrop-blur-md"
          @click="handleClose"
        />
        
        <!-- Modal -->
        <div class="relative w-full max-w-lg auth-modal-card">
          <!-- 卡片主体 -->
          <div class="relative bg-[var(--color-card)] rounded-2xl shadow-2xl border border-[var(--color-border)]">
            <!-- Header -->
            <div class="auth-modal-header px-8 pt-10 pb-4 text-center">
              <h2 class="text-2xl font-bold text-[var(--color-text)]">
                {{ isRegister ? '创建账号' : '欢迎回来' }}
              </h2>
              <p class="mt-4 text-sm text-[var(--color-text-muted)]">
                {{ isRegister ? '注册后可管理您的所有链接' : '登录以查看和管理您的链接' }}
              </p>
            </div>
            
            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="auth-modal-form px-8 pt-6 pb-6 space-y-8">
              <BaseInput
                v-model="email"
                type="email"
                label="邮箱"
                placeholder="your@email.com"
                size="sm"
                required
              />
              
              <BaseInput
                v-model="password"
                type="password"
                label="密码"
                placeholder="输入密码"
                :error="passwordError"
                size="sm"
                required
              />
              
              <Transition name="slide-up">
                <BaseInput
                  v-if="isRegister"
                  v-model="confirmPassword"
                  type="password"
                  label="确认密码"
                  placeholder="再次输入密码"
                  :error="confirmError"
                  size="sm"
                  required
                />
              </Transition>
              
              <!-- Error message -->
              <div v-if="errorMsg" class="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p class="text-sm text-red-400 text-center">{{ errorMsg }}</p>
              </div>
              
              <!-- Submit -->
              <BaseButton
                type="submit"
                variant="primary"
                size="lg"
                block
                :loading="isLoading"
                :disabled="!canSubmit"
                class="auth-modal-submit !py-3 !text-base !font-semibold !rounded-xl"
              >
                {{ isRegister ? '创建账号' : '登录' }}
              </BaseButton>
            </form>
            
            <!-- Footer -->
            <div class="auth-modal-footer px-8 pb-10 pt-4">
              <p class="text-center text-sm text-[var(--color-text-muted)]">
                {{ isRegister ? '已有账号？' : '还没有账号？' }}
                <button
                  type="button"
                  class="text-[var(--color-primary)] font-medium hover:underline ml-1"
                  @click="switchMode"
                >
                  {{ isRegister ? '立即登录' : '免费注册' }}
                </button>
              </p>
            </div>
            
            <!-- Close button -->
            <button
              type="button"
              class="absolute top-4 right-4 p-2 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] transition-all"
              @click="handleClose"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
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
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 兜底布局，避免 Tailwind 构建缺失时卡片过窄/间距过紧 */
.auth-modal-card {
  max-width: 760px;
}

.auth-modal-header {
  padding: 26px 32px 12px;
}

.auth-modal-form {
  padding: 18px 32px 18px;
  gap: 18px;
}

.auth-modal-footer {
  padding: 12px 32px 26px;
}

.auth-modal-submit {
  padding-top: 12px !important;
  padding-bottom: 12px !important;
  font-size: 15px !important;
}

/* 输入框高度与内边距紧凑一些 */
.auth-modal-card :deep(input) {
  padding: 10px 12px;
  min-height: 42px;
  font-size: 14px;
}
</style>
