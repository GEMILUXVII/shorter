<script setup>
defineProps({
  padding: {
    type: String,
    default: 'md',
    validator: (v) => ['none', 'sm', 'md', 'lg'].includes(v)
  },
  hover: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div
    :class="[
      'bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl',
      'shadow-[var(--shadow-sm)]',
      'transition-all duration-200',
      // Padding
      {
        'p-0': padding === 'none',
        'p-5': padding === 'sm',
        'p-8': padding === 'md',
        'p-10': padding === 'lg',
      },
      // Hover effect
      hover && 'hover:shadow-[var(--shadow-md)] hover:border-[var(--color-primary)]'
    ]"
  >
    <slot />
  </div>
</template>
