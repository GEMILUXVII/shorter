<script setup>
import LinkGenerator from '@/components/features/LinkGenerator.vue'
import StatsPanel from '@/components/features/StatsPanel.vue'
import LinkList from '@/components/features/LinkList.vue'
import { useLinkStore } from '@/stores/linkStore'

const linkStore = useLinkStore()
</script>

<template>
  <div class="py-16 lg:py-24 px-6 sm:px-8 lg:px-12">
    <div class="max-w-5xl mx-auto space-y-20">
      <!-- Hero Section -->
      <section class="text-center py-8">
        <h1 class="text-5xl sm:text-6xl font-bold text-[var(--color-text)] leading-tight">
          简洁 · 快速 · 可靠
        </h1>
        <p class="mt-6 text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
          Shorter 是一个现代化的短链服务，帮助您将冗长的链接转换为简洁的短链接，方便分享和追踪。
        </p>
      </section>
      
      <!-- Link Generator -->
      <section class="flex justify-center py-4">
        <LinkGenerator />
      </section>
      
      <!-- Stats Panel -->
      <section v-if="linkStore.totalLinks > 0" class="py-4">
        <h2 class="text-2xl font-semibold text-[var(--color-text)] mb-8 text-center">数据概览</h2>
        <StatsPanel />
      </section>
      
      <!-- Recent Links -->
      <section v-if="linkStore.totalLinks > 0" class="py-4">
        <LinkList />
      </section>
      
      <!-- Features -->
      <section class="py-12">
        <h2 class="text-2xl font-semibold text-[var(--color-text)] text-center mb-12">为什么选择 Shorter?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl text-center">
            <div class="w-16 h-16 mx-auto rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-[var(--color-text)]">极速响应</h3>
            <p class="mt-4 text-base text-[var(--color-text-secondary)] leading-relaxed">
              基于 Cloudflare 全球边缘网络，短链跳转延迟低于 50ms
            </p>
          </div>
          
          <div class="p-8 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl text-center">
            <div class="w-16 h-16 mx-auto rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-[var(--color-text)]">数据统计</h3>
            <p class="mt-4 text-base text-[var(--color-text-secondary)] leading-relaxed">
              追踪每个短链的点击量，了解链接的传播效果
            </p>
          </div>
          
          <div class="p-8 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl text-center">
            <div class="w-16 h-16 mx-auto rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-[var(--color-text)]">安全可靠</h3>
            <p class="mt-4 text-base text-[var(--color-text-secondary)] leading-relaxed">
              数据加密存储，支持 HTTPS，确保链接安全
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
