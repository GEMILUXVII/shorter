<script setup>
import { computed, useSlots, useAttrs } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (v) =>
      [
        "primary",
        "secondary",
        "ghost",
        "outline",
        "destructive",
        "link",
      ].includes(v),
  },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md", "lg", "xl", "icon"].includes(v),
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  as: {
    type: String,
    default: "button",
  },
});

const slots = useSlots();
const attrs = useAttrs();

// 计算 ARIA 属性
const ariaProps = computed(() => {
  const result = {};

  // 如果正在加载，设置 aria-busy
  if (props.loading) {
    result['aria-busy'] = true;
  }

  // 如果禁用，设置 aria-disabled
  if (props.disabled) {
    result['aria-disabled'] = true;
  }

  return result;
});

const classes = computed(() => {
  const base = [
    "inline-flex items-center justify-center gap-2",
    "font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ];

  // Variant styles
  const variants = {
    primary: [
      "bg-[var(--primary)] text-[var(--primary-foreground)]",
      "hover:bg-[var(--primary-hover)] hover:shadow-lg hover:-translate-y-0.5",
      "focus-visible:ring-[var(--primary)]",
      "shadow-md",
    ],
    secondary: [
      "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
      "hover:bg-[var(--muted)]",
      "focus-visible:ring-[var(--ring)]",
    ],
    ghost: [
      "bg-transparent text-[var(--foreground-secondary)]",
      "hover:bg-[var(--secondary)] hover:text-[var(--foreground)]",
      "focus-visible:ring-[var(--ring)]",
    ],
    outline: [
      "bg-transparent border border-[var(--border)]",
      "text-[var(--foreground)]",
      "hover:bg-[var(--secondary)]",
      "focus-visible:ring-[var(--ring)]",
    ],
    destructive: [
      "bg-[var(--destructive)] text-white",
      "hover:bg-[var(--destructive)]/90",
      "focus-visible:ring-[var(--destructive)]",
    ],
    link: [
      "bg-transparent text-[var(--primary)]",
      "hover:underline underline-offset-4",
      "focus-visible:ring-[var(--primary)]",
    ],
  };

  // Size styles
  const sizes = {
    sm: "h-8 px-3 text-xs rounded-md",
    md: "h-10 px-4 text-sm rounded-lg",
    lg: "h-11 px-6 text-base rounded-lg",
    xl: "h-12 px-8 text-lg rounded-xl",
    icon: "h-10 w-10 rounded-lg",
  };

  return [
    ...base,
    ...variants[props.variant],
    sizes[props.size],
    props.rounded ? "rounded-full" : "",
    props.loading ? "cursor-wait" : "cursor-pointer",
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

<template>
  <component
    :is="as"
    :class="classes"
    :disabled="disabled || loading"
    v-bind="ariaProps"
  >
    <!-- Loading Spinner -->
    <svg
      v-if="loading"
      class="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
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
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span v-if="loading" class="sr-only">Loading...</span>

    <!-- Icon Slot (left) -->
    <slot name="icon-left" />

    <!-- Default Slot -->
    <slot />

    <!-- Icon Slot (right) -->
    <slot name="icon-right" />
  </component>
</template>
