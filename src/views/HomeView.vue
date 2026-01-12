<script setup>
import AuroraBackground from '@/components/common/AuroraBackground.vue'
import LinkGenerator from '@/components/features/LinkGenerator.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const features = [
  {
    icon: 'bolt',
    title: 'home.features.speed.title',
    desc: 'home.features.speed.desc',
    color: 'amber'
  },
  {
    icon: 'chart',
    title: 'home.features.stats.title',
    desc: 'home.features.stats.desc',
    color: 'blue'
  },
  {
    icon: 'shield',
    title: 'home.features.secure.title',
    desc: 'home.features.secure.desc',
    color: 'emerald'
  }
]
</script>

<template>
  <AuroraBackground>
    <!-- Hero + Link Generator -->
    <LinkGenerator />
    
    <!-- Features Section - 更加淡化 -->
    <section class="relative py-24 lg:py-32 px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16 opacity-0 animate-fade-in-up" style="animation-fill-mode: forwards; animation-delay: 0.1s;">
          <h2 class="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-3">
            {{ t('home.whyChoose') }}
          </h2>
          <p class="text-base text-[var(--muted-foreground)] max-w-xl mx-auto">
            基于 Cloudflare 全球边缘网络，为您提供企业级的短链接服务
          </p>
        </div>
        
        <!-- Feature Cards - 极简风格 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div 
            v-for="(feature, index) in features" 
            :key="feature.title"
            class="group text-center opacity-0 animate-fade-in-up"
            :style="{ animationFillMode: 'forwards', animationDelay: `${0.2 + index * 0.1}s` }"
          >
            <!-- Icon - 极简 (Minimalist) -->
            <div 
              class="w-12 h-12 mx-auto flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
              :class="{
                'text-amber-500': feature.color === 'amber',
                'text-blue-500': feature.color === 'blue',
                'text-emerald-500': feature.color === 'emerald'
              }"
            >
              <!-- Bolt -->
              <svg v-if="feature.icon === 'bolt'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <!-- Chart -->
              <svg v-else-if="feature.icon === 'chart'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <!-- Shield -->
              <svg v-else-if="feature.icon === 'shield'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            
            <!-- Content -->
            <h3 class="text-lg font-semibold text-[var(--foreground)] mb-2">
              {{ t(feature.title) }}
            </h3>
            <p class="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-xs mx-auto">
              {{ t(feature.desc) }}
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Stats Section - 更简洁 -->
    <section class="relative py-16 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="space-y-1">
            <div class="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">200+</div>
            <div class="text-xs text-[var(--muted-foreground)]">全球边缘节点</div>
          </div>
          <div class="space-y-1">
            <div class="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">&lt;50ms</div>
            <div class="text-xs text-[var(--muted-foreground)]">平均响应时间</div>
          </div>
          <div class="space-y-1">
            <div class="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">99.9%</div>
            <div class="text-xs text-[var(--muted-foreground)]">服务可用性</div>
          </div>
          <div class="space-y-1">
            <div class="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">∞</div>
            <div class="text-xs text-[var(--muted-foreground)]">免费链接数</div>
          </div>
        </div>
      </div>
    </section>
  </AuroraBackground>
</template>
