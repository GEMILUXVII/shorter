<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const spotlightRef = ref(null)
const isVisible = ref(false)

function handleMouseMove(e) {
  if (spotlightRef.value) {
    spotlightRef.value.style.left = `${e.clientX}px`
    spotlightRef.value.style.top = `${e.clientY}px`
  }
}

function handleMouseEnter() {
  isVisible.value = true
}

function handleMouseLeave() {
  isVisible.value = false
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseenter', handleMouseEnter)
  document.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<template>
  <div
    ref="spotlightRef"
    class="spotlight pointer-events-none fixed z-[100] w-[600px] h-[600px] rounded-full transition-opacity duration-500"
    :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }"
    :style="{
      background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 60%)',
      transform: 'translate(-50%, -50%)'
    }"
  />
</template>
