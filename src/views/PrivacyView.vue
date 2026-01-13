<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-[var(--background)]">
    <div class="max-w-3xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-3xl lg:text-4xl font-bold text-[var(--foreground)] mb-4">
          {{ t('privacy.title') }}
        </h1>
        <p class="text-[var(--muted-foreground)]">
          {{ t('privacy.lastUpdated') }}
        </p>
      </div>

      <!-- Content -->
      <div class="prose prose-lg max-w-none">
        <div class="space-y-8 text-[var(--foreground)]">
          <section>
            <h2 class="text-xl font-semibold mb-4">{{ t('privacy.sections.collection.title') }}</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed mb-4">
              {{ t('privacy.sections.collection.desc') }}
            </p>
            <ul class="list-disc list-inside text-[var(--muted-foreground)] space-y-2 ml-4">
              <li v-for="(item, index) in tm('privacy.sections.collection.items')" :key="index">{{ item }}</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">{{ t('privacy.sections.usage.title') }}</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed mb-4">
              {{ t('privacy.sections.usage.desc') }}
            </p>
            <ul class="list-disc list-inside text-[var(--muted-foreground)] space-y-2 ml-4">
              <li v-for="(item, index) in tm('privacy.sections.usage.items')" :key="index">{{ item }}</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">{{ t('privacy.sections.sharing.title') }}</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              {{ t('privacy.sections.sharing.desc') }}
            </p>
            <ul class="list-disc list-inside text-[var(--muted-foreground)] space-y-2 ml-4 mt-4">
              <li v-for="(item, index) in tm('privacy.sections.sharing.items')" :key="index">{{ item }}</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">{{ t('privacy.sections.security.title') }}</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              {{ t('privacy.sections.security.desc') }}
            </p>
            <ul class="list-disc list-inside text-[var(--muted-foreground)] space-y-2 ml-4 mt-4">
              <li v-for="(item, index) in tm('privacy.sections.security.items')" :key="index">{{ item }}</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">{{ t('privacy.sections.cookies.title') }}</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              {{ t('privacy.sections.cookies.desc') }}
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">{{ t('privacy.sections.rights.title') }}</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed mb-4">
              {{ t('privacy.sections.rights.desc') }}
            </p>
            <ul class="list-disc list-inside text-[var(--muted-foreground)] space-y-2 ml-4">
              <li v-for="(item, index) in tm('privacy.sections.rights.items')" :key="index">{{ item }}</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">{{ t('privacy.sections.contact.title') }}</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              {{ t('privacy.sections.contact.desc') }}
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">{{ t('privacy.sections.updates.title') }}</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              {{ t('privacy.sections.updates.desc') }}
            </p>
          </section>
        </div>
      </div>

      <!-- Back Link -->
      <div class="mt-12 pt-8 border-t border-[var(--border)]">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ t('footer.backToHome') }}
        </router-link>
      </div>
    </div>
  </div>
</template>
