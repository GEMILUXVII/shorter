<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-[var(--background)]">
    <div class="max-w-3xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-3xl lg:text-4xl font-bold text-[var(--foreground)] mb-4">
          隐私政策
        </h1>
        <p class="text-[var(--muted-foreground)]">
          最后更新日期：2024年1月
        </p>
      </div>

      <!-- Content -->
      <div class="prose prose-lg max-w-none">
        <div class="space-y-8 text-[var(--foreground)]">
          <section>
            <h2 class="text-xl font-semibold mb-4">1. 信息收集</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed mb-4">
              我们收集的信息仅限于提供服务所必需的最少数据：
            </p>
            <ul class="list-disc list-inside text-[var(--muted-foreground)] space-y-2 ml-4">
              <li>账户信息：注册时提供的电子邮件地址</li>
              <li>链接数据：您创建的原始 URL 和生成的短链接</li>
              <li>访问统计：短链接的点击次数和基本访问时间</li>
              <li>技术信息：IP 地址、浏览器类型（用于安全和分析目的）</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">2. 信息使用</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed mb-4">
              我们使用收集的信息用于：
            </p>
            <ul class="list-disc list-inside text-[var(--muted-foreground)] space-y-2 ml-4">
              <li>提供和维护短链接服务</li>
              <li>向您展示链接访问统计数据</li>
              <li>检测和防止滥用、欺诈或安全威胁</li>
              <li>改进我们的服务质量</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">3. 信息共享</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              我们不会出售、交易或以其他方式向外部方转让您的个人信息。我们可能会在以下情况下共享信息：
            </p>
            <ul class="list-disc list-inside text-[var(--muted-foreground)] space-y-2 ml-4 mt-4">
              <li>遵守法律要求或响应合法的法律程序</li>
              <li>保护我们的权利、隐私、安全或财产</li>
              <li>与提供基础设施服务的第三方（如 Cloudflare）合作</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">4. 数据安全</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              我们采用行业标准的安全措施来保护您的数据，包括：
            </p>
            <ul class="list-disc list-inside text-[var(--muted-foreground)] space-y-2 ml-4 mt-4">
              <li>所有数据传输使用 HTTPS 加密</li>
              <li>密码使用安全的哈希算法存储</li>
              <li>定期审查和更新安全实践</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">5. Cookie 使用</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              我们使用必要的 Cookie 来维护您的登录状态和偏好设置。这些 Cookie 对于服务的正常运行是必需的。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">6. 您的权利</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed mb-4">
              您有权：
            </p>
            <ul class="list-disc list-inside text-[var(--muted-foreground)] space-y-2 ml-4">
              <li>访问您的个人数据</li>
              <li>更正不准确的数据</li>
              <li>删除您的账户和相关数据</li>
              <li>导出您的数据</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">7. 联系我们</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              如果您对本隐私政策有任何疑问，请通过 GitHub 仓库的 Issues 页面与我们联系。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">8. 政策更新</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              我们可能会不时更新本隐私政策。任何更改都将在本页面上发布，并更新"最后更新日期"。继续使用我们的服务即表示您接受更新后的政策。
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
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>
