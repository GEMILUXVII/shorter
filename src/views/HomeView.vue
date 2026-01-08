<script setup>
import LinkGenerator from '@/components/features/LinkGenerator.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="py-16 lg:py-24 px-6 sm:px-8 lg:px-12">
    <div class="max-w-5xl mx-auto space-y-20">
      <!-- Hero Section Removed -->
      
      <!-- Link Generator -->
      <section class="flex justify-center py-4">
        <LinkGenerator />
      </section>
      
      <!-- Features -->
      <section class="py-12">
        <h2 class="text-2xl font-semibold text-[var(--color-text)] text-center mb-12">{{ t('home.whyChoose') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl text-center">
            <div class="w-16 h-16 mx-auto rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-[var(--color-text)]">{{ t('home.features.speed.title') }}</h3>
            <p class="mt-4 text-base text-[var(--color-text-secondary)] leading-relaxed">
              {{ t('home.features.speed.desc') }}
            </p>
          </div>
          
          <div class="p-8 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl text-center">
            <div class="w-16 h-16 mx-auto rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-[var(--color-text)]">{{ t('home.features.stats.title') }}</h3>
            <p class="mt-4 text-base text-[var(--color-text-secondary)] leading-relaxed">
              {{ t('home.features.stats.desc') }}
            </p>
          </div>
          
          <div class="p-8 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl text-center">
            <div class="w-16 h-16 mx-auto rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-[var(--color-text)]">{{ t('home.features.secure.title') }}</h3>
            <p class="mt-4 text-base text-[var(--color-text-secondary)] leading-relaxed">
              {{ t('home.features.secure.desc') }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
