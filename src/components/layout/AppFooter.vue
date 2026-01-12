<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = new Date().getFullYear()

const footerLinks = {
  product: [
    { name: '首页', href: '/' },
    { name: '控制台', href: '/dashboard' },
  ],
  resources: [
    { name: 'GitHub', href: 'https://github.com/GEMILUXVII/shorter', external: true },
    { name: '更新日志', href: 'https://github.com/GEMILUXVII/shorter/releases', external: true },
  ],
  legal: [
    { name: '隐私政策', href: '/privacy' },
    { name: '服务条款', href: '/terms' },
  ]
}
</script>

<template>
  <footer class="relative border-t border-[var(--border)] bg-[var(--background)]">
    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <!-- Brand Column -->
        <div class="lg:col-span-2 space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center shadow-lg shadow-[var(--primary)]/25">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </div>
            <span class="text-2xl font-bold tracking-tight text-[var(--foreground)]">Shorter</span>
          </div>
          <p class="text-[var(--muted-foreground)] text-base leading-relaxed max-w-md">
            简洁、安全、快速的短链接服务。基于 Cloudflare 全球边缘网络构建，为您提供极速可靠的链接缩短体验。
          </p>
          <div class="flex items-center gap-4">
            <!-- GitHub -->
            <a 
              href="https://github.com/GEMILUXVII/shorter" 
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-xl bg-[var(--secondary)] flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
            <!-- Cloudflare Badge -->
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--secondary)] text-[var(--muted-foreground)]">
              <svg class="h-4 w-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.6 15.7l.6-2.2c.1-.3 0-.5-.2-.7-.2-.1-.4-.2-.7-.1l-1.2.3c-.1 0-.2 0-.3-.1-.1-.1-.1-.2-.1-.3l.5-1.9c.1-.3 0-.6-.2-.7-.2-.2-.5-.2-.7-.1L12 11.3c-.1 0-.2 0-.3-.1 0-.1-.1-.2 0-.3l.5-1.8c.1-.3 0-.6-.3-.7-.2-.1-.5-.1-.7 0l-3.9 2.9c-.1.1-.2.2-.2.4v.2l.6 2.2c.1.3 0 .5-.2.7-.2.1-.4.2-.7.1l-1.2-.3c-.1 0-.2 0-.3.1-.1.1-.1.2-.1.3l.5 1.9c.1.3 0 .6-.2.7-.2.2-.5.2-.7.1l-2.3-1.3c-.1 0-.2 0-.3.1 0 .1-.1.2 0 .3l.5 1.8c.1.3 0 .6-.3.7-.2.1-.5.1-.7 0L.8 16c-.1-.1-.3-.1-.4 0-.1.1-.2.2-.2.4v4.1c0 .4.3.7.7.7h21.4c.4 0 .7-.3.7-.7v-4.1c0-.1-.1-.3-.2-.4-.1-.1-.3-.1-.4 0l-3.9 2.2c-.2.1-.5.1-.7 0-.3-.1-.4-.4-.3-.7l.5-1.8c0-.1 0-.2-.1-.3-.1-.1-.2-.1-.3-.1l-2.3 1.3c-.2.1-.5.1-.7-.1-.2-.2-.3-.4-.2-.7l.5-1.9c0-.1 0-.2-.1-.3-.1 0-.2-.1-.3-.1l-1.2.3c-.3.1-.5 0-.7-.1-.2-.2-.3-.4-.2-.7l.6-2.2z"/>
              </svg>
              <span class="text-xs font-medium">Powered by Cloudflare</span>
            </div>
          </div>
        </div>

        <!-- Links Column 1 -->
        <div>
          <h3 class="font-semibold text-[var(--foreground)] mb-6">产品</h3>
          <ul class="space-y-4">
            <li v-for="link in footerLinks.product" :key="link.name">
              <a 
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                class="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors text-sm group inline-flex items-center gap-1"
              >
                <span class="relative">
                  {{ link.name }}
                  <span class="absolute left-0 -bottom-0.5 w-0 h-px bg-[var(--foreground)] transition-all duration-300 group-hover:w-full" />
                </span>
                <svg v-if="link.external" class="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <!-- Links Column 2 -->
        <div>
          <h3 class="font-semibold text-[var(--foreground)] mb-6">资源</h3>
          <ul class="space-y-4">
            <li v-for="link in footerLinks.resources" :key="link.name">
              <a 
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                class="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors text-sm group inline-flex items-center gap-1"
              >
                <span class="relative">
                  {{ link.name }}
                  <span class="absolute left-0 -bottom-0.5 w-0 h-px bg-[var(--foreground)] transition-all duration-300 group-hover:w-full" />
                </span>
                <svg v-if="link.external" class="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-16 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-[var(--muted-foreground)]">
          © {{ currentYear }} 
          <a href="https://github.com/GEMILUXVII" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--primary)] transition-colors">GEMILUXVII</a>. 
          All rights reserved.
        </p>
        <div class="flex items-center gap-6 text-sm text-[var(--muted-foreground)]">
          <a href="/privacy" class="hover:text-[var(--foreground)] transition-colors">隐私政策</a>
          <a href="/terms" class="hover:text-[var(--foreground)] transition-colors">服务条款</a>
        </div>
      </div>
    </div>

    <!-- Large Watermark Text -->
    <div class="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02]">
      <div class="text-[12vw] lg:text-[180px] font-black leading-none text-[var(--foreground)] whitespace-nowrap select-none text-center transform translate-y-1/3">
        SHORTER
      </div>
    </div>
  </footer>
</template>
