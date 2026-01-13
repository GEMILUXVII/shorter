<div align="center">
  <img src="public/favicon.svg" alt="Shorter Logo" width="160" />
</div>

# <div align="center">Shorter</div>

<div align="center">
  <strong>现代化短链服务 | 优雅的链接管理</strong>
</div>

<br>


<div align="center">
  <a href="https://github.com/GEMILUXVII/shorter/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0-E53935?style=for-the-badge" alt="License"></a>
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Vue-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3"></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
</div>

<div align="center">
  <a href="https://workers.cloudflare.com/"><img src="https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Workers"></a>
  <a href="https://developers.cloudflare.com/kv/"><img src="https://img.shields.io/badge/Cloudflare-KV-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare KV"></a>
  <a href="#"><img src="https://img.shields.io/badge/i18n-zh%20%7C%20en-0097A7?style=for-the-badge&logo=translate&logoColor=white" alt="i18n"></a>
</div>

<br>

<div align="center">
  <a href="#项目简介">项目简介</a> |
  <a href="#功能特性">功能特性</a> |
  <a href="#快速开始">快速开始</a> |
  <a href="#部署指南">部署指南</a> |
  <a href="https://shorter-7sc.pages.dev">在线演示</a>
</div>

<div align="center">
  <strong>中文</strong> | <a href="README_EN.md">English</a>
</div>

---

## 项目简介

Shorter 是一个现代化的极简短链服务，基于 Vue 3 构建，部署在 Cloudflare Workers 上。它提供简洁优雅的用户界面，支持暗色模式和中英双语切换。

**设计理念**：清新脱俗 (Fresh & Refined)。我们采用自然、温暖的色调（鼠尾草绿、奶油白），注重留白和微动效，打造宁静专注的用户体验。

## 界面预览

<details>
<summary>点击查看界面预览</summary>
<div align="center">
  <h3>首页 (Home)</h3>
  <img src="public/home.png" alt="Shorter Home" width="80%" />
  <br><br>
  <h3>仪表盘 (Dashboard)</h3>
  <img src="public/dashboard.png" alt="Shorter Dashboard" width="80%" />
</div>
</details>

## 功能特性

- **即时生成短链**：粘贴长链接，立即获得短链
- **自定义短码**：创建易记的品牌化短链
- **二维码生成**：每个短链自动生成二维码
- **点击统计**：追踪每个链接的点击次数
- **高级选项**：
  - 链接过期时间（1天、7天、30天或永不过期）
  - 密码保护
  - 访问次数限制
- **暗色模式**：优雅的 "午夜花园" 主题，薄荷绿点缀
- **国际化**：完整支持中英双语，一键切换
- **响应式设计**：桌面、平板、移动端无缝体验
- **边缘部署**：基于 Cloudflare Workers，全球极速响应

## 快速开始

### 前置条件

- Node.js 18+
- npm 或 pnpm
- Cloudflare 账号（用于部署）

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/GEMILUXVII/shorter.git
cd shorter

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

应用将在 `http://localhost:5173` 启动。

### 生产构建

```bash
npm run build
```

## 部署指南

Shorter 设计为部署在 Cloudflare Workers 上，使用 Cloudflare KV 作为存储。

### 1. 配置 Wrangler

复制示例配置文件：

```bash
cp wrangler.toml.example wrangler.toml
```

编辑 `wrangler.toml`，填入你的 KV 命名空间 ID。

### 2. 创建 KV 命名空间

```bash
# 生产环境 KV
npx wrangler kv namespace create LINKS_KV
npx wrangler kv namespace create USERS_KV

# 预览环境 KV
npx wrangler kv namespace create LINKS_KV --preview
npx wrangler kv namespace create USERS_KV --preview
```

### 3. 部署

```bash
npm run build
npx wrangler pages deploy dist
```

详细部署说明请参阅 [DEPLOY.md](DEPLOY.md)。

## 技术栈

| 分类     | 技术                           |
| -------- | ------------------------------ |
| 前端     | Vue 3, Vite, Tailwind CSS      |
| 状态管理 | Pinia                          |
| 国际化   | vue-i18n                       |
| 后端     | Cloudflare Workers (Functions) |
| 存储     | Cloudflare KV                  |
| 部署     | Cloudflare Pages               |

## 项目结构

```
shorter/
├── public/                 # 静态资源 (favicon)
├── src/
│   ├── components/         # Vue 组件
│   │   ├── common/         # 基础 UI 组件
│   │   ├── features/       # 功能组件 (LinkGenerator, AuthModal 等)
│   │   └── layout/         # 布局组件 (AppHeader, AppFooter)
│   ├── composables/        # Vue Composables (useClipboard, useToast 等)
│   ├── i18n/               # 国际化
│   │   ├── locales/        # zh.js, en.js
│   │   └── index.js        # i18n 配置
│   ├── stores/             # Pinia 状态仓库
│   ├── views/              # 页面组件
│   └── style.css           # 全局样式和 CSS 变量
├── functions/              # Cloudflare Workers API
├── index.html
├── vite.config.js
└── wrangler.toml
```

## 许可证

[![](https://www.gnu.org/graphics/agplv3-155x51.png "AGPL v3 logo")](https://www.gnu.org/licenses/agpl-3.0.txt)

Copyright (C) 2025 GEMILUXVII

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
