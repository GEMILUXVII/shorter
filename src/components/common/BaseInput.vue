<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const inputClasses = computed(() => [
  'w-full rounded-lg border bg-[var(--color-card)] text-[var(--color-text)]',
  'placeholder:text-[var(--color-text-muted)]',
  'transition-all duration-200',
  'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent',
  'disabled:opacity-50 disabled:cursor-not-allowed',
  // Size
  {
    'px-3 py-2 text-sm': props.size === 'sm',
    'px-4 py-3 text-base': props.size === 'md',
    'px-5 py-4 text-lg': props.size === 'lg',
  },
  // Error state
  props.error
    ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]'
    : 'border-[var(--color-border)]'
])

function handleInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" class="block text-sm font-medium text-[var(--color-text)] mb-1.5">
      {{ label }}
    </label>
    
    <!-- Input wrapper -->
    <div class="relative">
      <!-- Prefix slot -->
      <div v-if="$slots.prefix" class="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none">
        <slot name="prefix" />
      </div>
      
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          inputClasses,
          { 'pl-12': $slots.prefix, 'pr-12': $slots.suffix }
        ]"
        @input="handleInput"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      
      <!-- Suffix slot -->
      <div v-if="$slots.suffix" class="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
        <slot name="suffix" />
      </div>
    </div>
    
    <!-- Error message -->
    <p v-if="error" class="mt-2 mb-2 text-sm text-[var(--color-error)]">
      {{ error }}
    </p>
    
    <!-- Hint -->
    <p v-else-if="hint" class="mt-1.5 text-sm text-[var(--color-text-muted)]">
      {{ hint }}
    </p>
  </div>
</template>
