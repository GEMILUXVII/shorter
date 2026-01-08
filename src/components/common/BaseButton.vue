<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'ghost', 'danger'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      // Sizes
      {
        'px-4 py-2 text-sm': size === 'sm',
        'px-5 py-3 text-base': size === 'md',
        'px-8 py-4 text-lg': size === 'lg',
      },
      // Variants
      {
        'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus:ring-[var(--color-primary)]': variant === 'primary',
        'bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-border)] focus:ring-[var(--color-border)]': variant === 'secondary',
        'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] focus:ring-[var(--color-border)]': variant === 'ghost',
        'bg-[var(--color-error)] text-white hover:bg-red-600 focus:ring-[var(--color-error)]': variant === 'danger',
      },
      // Full width
      { 'w-full': block }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <!-- Loading Spinner -->
    <svg
      v-if="loading"
      class="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
    
    <slot />
  </button>
</template>
