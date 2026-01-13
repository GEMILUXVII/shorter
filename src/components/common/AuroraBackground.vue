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
  /* Light mode: smooth flowing aurora with soft pastels */
  background-image:
    linear-gradient(
      115deg,
      oklch(92% 0.08 140) 0%,
      oklch(90% 0.1 60) 20%,
      oklch(88% 0.12 200) 40%,
      oklch(91% 0.1 320) 60%,
      oklch(89% 0.08 100) 80%,
      oklch(92% 0.08 140) 100%
    );
  background-size: 400% 100%;
  filter: blur(40px);
  opacity: 0.8;
  animation: aurora-flow 20s ease-in-out infinite;
  pointer-events: none;
}

.dark .aurora-layer {
  /* 暗色模式渐变 - 使用不同色相创造流动感 */
  background-image:
    linear-gradient(
      125deg,
      oklch(20% 0.12 290) 0%,
      oklch(18% 0.15 260) 25%,
      oklch(22% 0.10 320) 50%,
      oklch(19% 0.14 240) 75%,
      oklch(20% 0.12 290) 100%
    );
  background-size: 300% 300%;
  filter: blur(80px);
  opacity: 0.9;
}

.aurora-layer.with-mask {
  mask-image: radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%);
  -webkit-mask-image: radial-gradient(
    ellipse at 100% 0%,
    black 10%,
    transparent 70%
  );
}

/* 暗色模式下移除遮罩 - 必须放在 with-mask 之后 */
.dark .aurora-layer.with-mask {
  mask-image: none;
  -webkit-mask-image: none;
}

@keyframes aurora-flow {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
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

/* Dark mode blobs - vibrant but smooth */
.dark .blob-1 {
  background: oklch(40% 0.18 280 / 25%);
  filter: blur(70px);
}

.dark .blob-2 {
  background: oklch(35% 0.15 240 / 20%);
  filter: blur(70px);
}

.dark .blob-3 {
  background: oklch(38% 0.12 310 / 18%);
  filter: blur(70px);
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
