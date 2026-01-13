<script setup>
import { ref, onMounted, onUnmounted } from "vue";

defineProps({
  showRadialGradient: {
    type: Boolean,
    default: true,
  },
});

const isVisible = ref(true);

function handleVisibilityChange() {
  isVisible.value = !document.hidden;
}

onMounted(() => {
  document.addEventListener("visibilitychange", handleVisibilityChange);
});

onUnmounted(() => {
  document.removeEventListener("visibilitychange", handleVisibilityChange);
});
</script>

<template>
  <div class="aurora-container">
    <!-- Aurora Effect Layer -->
    <div
      class="aurora-layer"
      :class="{ 'with-mask': showRadialGradient }"
      :style="{ animationPlayState: isVisible ? 'running' : 'paused' }"
    />

    <!-- Decorative Blobs -->
    <div class="blob blob-1" />
    <div class="blob blob-2" />
    <div class="blob blob-3" />

    <!-- Content -->
    <div class="aurora-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.aurora-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: var(--background);
}

.aurora-layer {
  position: absolute;
  inset: -10px;
  /* Light mode: warm, sage-like tones that harmonize with cream background */
  background-image:
    repeating-linear-gradient(
      100deg,
      oklch(96% 0.02 80) 0%,
      oklch(96% 0.02 80) 7%,
      transparent 10%,
      transparent 12%,
      oklch(96% 0.02 80) 16%
    ),
    repeating-linear-gradient(
      100deg,
      oklch(85% 0.08 140) 10%,
      oklch(88% 0.06 80) 15%,
      oklch(90% 0.05 200) 20%,
      oklch(87% 0.07 160) 25%,
      oklch(85% 0.06 120) 30%
    );
  background-size: 300%, 200%;
  background-position:
    50% 50%,
    50% 50%;
  filter: blur(10px);
  opacity: 0.6;
  animation: aurora 60s linear infinite;
  pointer-events: none;
}

.dark .aurora-layer {
  background-image:
    repeating-linear-gradient(
      100deg,
      oklch(14% 0 0) 0%,
      oklch(14% 0 0) 7%,
      transparent 10%,
      transparent 12%,
      oklch(14% 0 0) 16%
    ),
    repeating-linear-gradient(
      100deg,
      oklch(50% 0.3 277) 10%,
      oklch(55% 0.25 300) 15%,
      oklch(60% 0.2 220) 20%,
      oklch(55% 0.15 280) 25%,
      oklch(50% 0.25 260) 30%
    );
  opacity: 0.35;
}

.aurora-layer.with-mask {
  mask-image: radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%);
  -webkit-mask-image: radial-gradient(
    ellipse at 100% 0%,
    black 10%,
    transparent 70%
  );
}

@keyframes aurora {
  from {
    background-position:
      50% 50%,
      50% 50%;
  }
  to {
    background-position:
      350% 50%,
      350% 50%;
  }
}

/* Decorative Blobs */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
  pointer-events: none;
  animation: float 6s ease-in-out infinite;
}

/* Light mode blobs - warm sage/amber tones */
.blob-1 {
  top: 10%;
  right: 10%;
  width: 300px;
  height: 300px;
  background: oklch(80% 0.1 140 / 40%);
  animation-delay: 0s;
}

.blob-2 {
  bottom: 20%;
  left: 10%;
  width: 250px;
  height: 250px;
  background: oklch(85% 0.08 80 / 35%);
  animation-delay: 2s;
}

.blob-3 {
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background: oklch(82% 0.06 200 / 30%);
  animation-delay: 4s;
}

/* Dark mode blobs - keep purple/blue */
.dark .blob-1 {
  background: oklch(50% 0.3 277 / 30%);
}

.dark .blob-2 {
  background: oklch(55% 0.25 200 / 25%);
}

.dark .blob-3 {
  background: oklch(60% 0.2 300 / 20%);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.05);
  }
}

.aurora-content {
  position: relative;
  z-index: 10;
}
</style>
