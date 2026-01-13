<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="relative bg-[var(--card)] border-t border-[var(--border)]">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Main Content -->
      <div class="py-12 lg:py-16">
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          <!-- Brand Section -->
          <div class="flex-shrink-0">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-9 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                <svg class="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </div>
              <span class="text-xl font-semibold text-[var(--foreground)]">Shorter</span>
            </div>
            <p class="text-sm text-[var(--muted-foreground)] max-w-xs leading-relaxed">
              简洁、安全、快速的短链接服务
            </p>
          </div>

          <!-- Links Section -->
          <div class="flex flex-wrap gap-x-16 gap-y-8">
            <!-- 产品 -->
            <div>
              <h4 class="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider mb-4">产品</h4>
              <ul class="space-y-3">
                <li>
                  <a href="/" class="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                    首页
                  </a>
                </li>
                <li>
                  <a href="/dashboard" class="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                    控制台
                  </a>
                </li>
              </ul>
            </div>

            <!-- 资源 -->
            <div>
              <h4 class="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider mb-4">资源</h4>
              <ul class="space-y-3">
                <li>
                  <a
                    href="https://github.com/GEMILUXVII/shorter"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1.5"
                  >
                    GitHub
                    <svg class="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/GEMILUXVII/shorter/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1.5"
                  >
                    更新日志
                    <svg class="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <!-- 法律 -->
            <div>
              <h4 class="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider mb-4">法律</h4>
              <ul class="space-y-3">
                <li>
                  <a href="/privacy" class="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                    隐私政策
                  </a>
                </li>
                <li>
                  <a href="/terms" class="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                    服务条款
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="py-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <!-- Cloudflare Badge -->
          <div class="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
            <svg class="h-4 w-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.2678-.2246-.2768-.5765-.4126-.9891-.4126H6.0493c-.0656 0-.1063-.0437-.1179-.0728-.0116-.0292-.027-.0876.0196-.1374.0976-.0977.2299-.1466.3673-.1466h9.4247c.6638 0 1.2543-.4066 1.4623-1.0081l.3911-1.1307c.0196-.0583.0126-.1216-.0187-.1749-.2616-.4457-.6808-.7824-1.2068-.9707l-1.4106-.5081c-.0996-.0346-.1753-.1179-.1927-.2211-.0173-.1033.0203-.2078.0954-.2708.3086-.2645.4932-.6434.4932-1.0552 0-.7649-.6239-1.3889-1.3889-1.3889-.1604 0-.3209.0289-.4756.0818-.0762.0264-.1523-.0347-.1523-.1122 0-1.8489-1.5031-3.352-3.352-3.352-1.5604 0-2.8911 1.0703-3.266 2.5232-.027.1041-.1311.1622-.2287.127-.4572-.1645-.9406-.2078-1.4286-.1139-.992.1899-1.8135.8936-2.1474 1.8354-.0583.1645-.2098.2751-.383.2751H3.5c-1.4636 0-2.6568 1.1751-2.6568 2.6151v.0106c0 .0596.0478.1074.1073.1074h18.2721c.0426 0 .0823-.0221.1045-.0582z"/>
            </svg>
            <span>Powered by Cloudflare</span>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <!-- GitHub Link -->
          <a
            href="https://github.com/GEMILUXVII/shorter"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>

          <!-- Copyright -->
          <p class="text-xs text-[var(--muted-foreground)]">
            © {{ currentYear }}
            <a
              href="https://github.com/GEMILUXVII"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-[var(--foreground)] transition-colors"
            >
              GEMILUXVII
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
