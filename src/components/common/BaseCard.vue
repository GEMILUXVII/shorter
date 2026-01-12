<script setup>
import { computed } from 'vue'

const props = defineProps({
  padding: {
    type: String,
    default: 'md',
    validator: (v) => ['none', 'sm', 'md', 'lg', 'xl'].includes(v)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'subtle', 'ghost', 'outlined'].includes(v)
  },
  hover: {
    type: Boolean,
    default: false
  },
  as: {
    type: String,
    default: 'div'
  }
})

const classes = computed(() => {
  const base = [
    'rounded-2xl',
    'transition-all duration-300'
  ]
  
  // 变体样式 - 更加淡化
  const variants = {
    // 默认：极淡的背景，无边框
    default: [
      'bg-[var(--card)]/50',
      'dark:bg-[var(--card)]/30'
    ],
    // 微妙：更淡的背景
    subtle: [
      'bg-[var(--secondary)]/30',
      'dark:bg-[var(--secondary)]/20'
    ],
    // 幽灵：几乎透明
    ghost: [
      'bg-transparent'
    ],
    // 带边框：用于需要明确边界时
    outlined: [
      'bg-transparent',
      'border border-[var(--border)]/50'
    ]
  }
  
  // 内边距
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }
  
  // 悬停效果 - 更加微妙
  const hoverStyles = props.hover ? [
    'hover:bg-[var(--secondary)]/50',
    'dark:hover:bg-[var(--secondary)]/30',
    'cursor-pointer'
  ] : []
  
  return [
    ...base,
    ...variants[props.variant],
    paddings[props.padding],
    ...hoverStyles
  ].filter(Boolean).join(' ')
})
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
