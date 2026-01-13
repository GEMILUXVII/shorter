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
          服务条款
        </h1>
        <p class="text-[var(--muted-foreground)]">
          最后更新日期：2024年1月
        </p>
      </div>

      <!-- Content -->
      <div class="prose prose-lg max-w-none">
        <div class="space-y-8 text-[var(--foreground)]">
          <section>
            <h2 class="text-xl font-semibold mb-4">1. 服务说明</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              Shorter 是一项免费的短链接生成服务，允许用户将长 URL 转换为短链接。本服务基于 Cloudflare 全球边缘网络构建，旨在提供快速、可靠的链接缩短体验。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">2. 使用条件</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed mb-4">
              使用本服务即表示您同意遵守以下条款：
            </p>
            <ul class="list-disc list-inside text-[var(--muted-foreground)] space-y-2 ml-4">
              <li>您必须年满 13 周岁才能使用本服务</li>
              <li>您需要对通过您的账户创建的所有链接负责</li>
              <li>您同意提供准确的账户信息</li>
              <li>您同意不会滥用本服务</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">3. 禁止行为</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed mb-4">
              您不得使用本服务来：
            </p>
            <ul class="list-disc list-inside text-[var(--muted-foreground)] space-y-2 ml-4">
              <li>创建指向非法、有害或恶意内容的链接</li>
              <li>传播恶意软件、病毒或其他有害代码</li>
              <li>进行网络钓鱼或欺诈活动</li>
              <li>侵犯他人的知识产权或隐私权</li>
              <li>发送垃圾邮件或进行未经授权的营销</li>
              <li>规避我们的安全措施或滥用系统资源</li>
              <li>创建指向成人内容、暴力内容或仇恨言论的链接</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">4. 链接管理</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              我们保留以下权利：
            </p>
            <ul class="list-disc list-inside text-[var(--muted-foreground)] space-y-2 ml-4 mt-4">
              <li>删除违反本条款的任何链接</li>
              <li>暂停或终止违规用户的账户</li>
              <li>在必要时与执法机构合作</li>
              <li>修改或终止服务的任何部分</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">5. 服务可用性</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              我们努力保持服务的高可用性，但不保证服务将始终不间断或无错误。我们可能会因维护、升级或其他原因暂时中断服务。对于因服务中断造成的任何损失，我们不承担责任。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">6. 免责声明</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              本服务按"现状"提供，不提供任何明示或暗示的保证。我们不对以下情况承担责任：
            </p>
            <ul class="list-disc list-inside text-[var(--muted-foreground)] space-y-2 ml-4 mt-4">
              <li>短链接指向的第三方网站的内容或行为</li>
              <li>因使用本服务而导致的任何直接或间接损失</li>
              <li>数据丢失或服务中断</li>
              <li>第三方对您链接的访问或使用</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">7. 知识产权</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              Shorter 服务及其相关的商标、标识和内容受知识产权法保护。本项目为开源项目，源代码在 MIT 许可证下发布。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">8. 账户终止</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              您可以随时删除您的账户。我们也保留在您违反本条款时终止您账户的权利。账户终止后，您创建的链接可能会被删除或停用。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">9. 条款修改</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              我们可能会不时修改本服务条款。重大变更将通过适当方式通知用户。继续使用本服务即表示您接受修改后的条款。
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-4">10. 联系方式</h2>
            <p class="text-[var(--muted-foreground)] leading-relaxed">
              如果您对本服务条款有任何疑问或需要报告滥用行为，请通过 GitHub 仓库的 Issues 页面与我们联系。
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
