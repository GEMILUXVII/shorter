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
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
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
  <a href="#api-文档">API 文档</a> |
  <a href="https://shorter-7sc.pages.dev">在线演示</a>
</div>

<div align="center">
  <strong>中文</strong> | <a href="README_EN.md">English</a>
</div>

---

## 项目简介

Shorter 是一个现代化的全栈短链服务，采用 JAMstack 架构，前端基于 Vue 3 构建，后端使用 Cloudflare Workers 无服务器函数，数据存储于 Cloudflare KV。整个应用部署在 Cloudflare 全球边缘网络上，提供极速的链接跳转体验。

### 设计理念

采用「清新精致」的设计风格：

- 亮色模式：温暖奶油色调，搭配流动的极光背景效果
- 暗色模式：深邃的午夜主题，配合紫色渐变点缀
- 注重留白与微动效，打造宁静专注的用户体验
- 使用 oklch 色彩系统确保色彩的感知一致性

### 架构概览

```
用户请求 --> Cloudflare CDN --> Vue SPA (前端)
                            --> Workers Functions (API)
                            --> Cloudflare KV (存储)
```

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

### 核心功能

- **即时生成短链**：粘贴长链接，一键生成 6 位短码
- **自定义短码**：支持自定义别名，创建品牌化短链
- **二维码生成**：每个短链自动生成可下载的二维码
- **点击统计**：实时追踪每个链接的访问次数

### 高级选项

- **链接过期**：支持 1 天、7 天、30 天或永不过期
- **密码保护**：为敏感链接设置访问密码（SHA-256 加盐哈希）
- **访问限制**：设置最大点击次数，达到后自动失效
- **私密备注**：添加仅自己可见的备注信息

### 安全特性

- **Cloudflare Turnstile**：隐形人机验证，防止滥用
- **JWT 认证**：基于 HMAC-SHA256 的安全令牌
- **密码加盐**：每个密码使用独立随机盐值
- **保留短码**：防止使用系统路径作为短码

### 用户体验

- **深色/浅色模式**：一键切换，偏好自动保存
- **国际化**：完整支持中英双语
- **响应式设计**：适配桌面、平板、移动端
- **流畅动画**：渐入、光束扫过、极光流动等视觉效果

## 快速开始

### 前置条件

- Node.js 18+
- npm 或 pnpm
- Cloudflare 账号

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/GEMILUXVII/shorter.git
cd shorter

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，填入 Turnstile Site Key

# 启动前端开发服务器
npm run dev

# 另开终端，启动后端服务（需要先配置 wrangler.toml）
npx wrangler pages dev dist --kv LINKS_KV --kv USERS_KV
```

前端将在 `http://localhost:5173` 启动，API 代理到 `http://localhost:8787`。

### 生产构建

```bash
npm run build
```

构建产物位于 `dist/` 目录。

## 部署指南

### 1. 创建 KV 命名空间

```bash
# 创建生产环境命名空间
npx wrangler kv namespace create LINKS_KV
npx wrangler kv namespace create USERS_KV

# 创建预览环境命名空间
npx wrangler kv namespace create LINKS_KV --preview
npx wrangler kv namespace create USERS_KV --preview
```

记录返回的命名空间 ID。

### 2. 配置 Wrangler

```bash
cp wrangler.toml.example wrangler.toml
```

编辑 `wrangler.toml`，填入 KV 命名空间 ID：

```toml
[[kv_namespaces]]
binding = "LINKS_KV"
id = "你的LINKS_KV命名空间ID"
preview_id = "你的LINKS_KV预览命名空间ID"

[[kv_namespaces]]
binding = "USERS_KV"
id = "你的USERS_KV命名空间ID"
preview_id = "你的USERS_KV预览命名空间ID"
```

### 3. 配置环境变量

在 Cloudflare Pages 项目设置中添加以下环境变量：

| 变量名 | 说明 |
|--------|------|
| `JWT_SECRET` | JWT 签名密钥（建议 32+ 字符随机字符串） |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile 密钥 |

### 4. 部署

```bash
npm run build
npx wrangler pages deploy dist
```

## API 文档

### 认证接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/auth/register` | 用户注册 |
| POST | `/api/auth/login` | 用户登录 |
| GET | `/api/auth/me` | 获取当前用户信息 |

### 链接接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/links` | 创建短链（需 Turnstile 验证） |
| GET | `/api/links` | 获取用户链接列表（需认证） |
| DELETE | `/api/links?code=xxx` | 删除指定链接（需认证） |

### 重定向接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/:code` | 重定向到原始 URL |
| POST | `/:code` | 密码保护链接的密码验证 |

### 数据模型

**Link 对象**

```javascript
{
  id: string,           // 唯一标识
  code: string,         // 短码（6位）
  originalUrl: string,  // 原始 URL
  shortUrl: string,     // 完整短链接
  clicks: number,       // 点击次数
  createdAt: number,    // 创建时间戳
  expiresAt: number,    // 过期时间戳（可选）
  password: string,     // 加密密码（可选）
  maxClicks: number,    // 最大点击数（可选）
  note: string,         // 备注（可选）
  userId: string        // 用户 ID（可选）
}
```

## 技术栈

### 前端

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.5 | 响应式 UI 框架 |
| Vite | 7.x | 构建工具 |
| Tailwind CSS | 4.x | 原子化 CSS |
| Pinia | 3.x | 状态管理 |
| vue-i18n | 11.x | 国际化 |
| qrcode | 1.5 | 二维码生成 |
| nanoid | 5.x | 短码生成 |

### 后端

| 技术 | 用途 |
|------|------|
| Cloudflare Workers | 无服务器运行时 |
| Cloudflare KV | 键值存储 |
| Cloudflare Turnstile | 人机验证 |
| Web Crypto API | 密码哈希与 JWT 签名 |

## 项目结构

```
shorter/
├── public/                  # 静态资源
│   └── favicon.svg          # 网站图标
├── src/
│   ├── components/
│   │   ├── common/          # 通用组件（Button, Toast, Turnstile）
│   │   ├── features/        # 功能组件（LinkGenerator, AuthModal, LinkList）
│   │   └── layout/          # 布局组件（AppHeader, AppFooter）
│   ├── composables/         # 组合式函数
│   │   ├── useApi.js        # API 请求封装
│   │   ├── useAuth.js       # 认证状态管理
│   │   ├── useClipboard.js  # 剪贴板操作
│   │   └── useToast.js      # 消息提示
│   ├── i18n/
│   │   ├── locales/         # 语言文件（zh.js, en.js）
│   │   └── index.js         # i18n 配置
│   ├── router/              # 路由配置
│   ├── stores/              # Pinia 状态仓库
│   │   └── linkStore.js     # 链接数据管理
│   ├── utils/               # 工具函数
│   │   ├── validators.js    # URL 验证
│   │   └── shortId.js       # 短码生成
│   ├── views/               # 页面组件
│   │   ├── HomeView.vue     # 首页
│   │   ├── DashboardView.vue # 仪表盘
│   │   ├── PrivacyView.vue  # 隐私政策
│   │   └── TermsView.vue    # 服务条款
│   ├── App.vue              # 根组件
│   ├── main.js              # 入口文件
│   └── style.css            # 全局样式
├── functions/               # Cloudflare Workers 函数
│   ├── [code].js            # 短链重定向处理
│   └── api/
│       ├── links.js         # 链接 CRUD
│       └── auth/[action].js # 认证处理
├── index.html
├── vite.config.js           # Vite 配置
├── wrangler.toml            # Workers 配置
└── package.json
```

## 性能优化

- **边缘计算**：基于 Cloudflare 200+ 全球节点，重定向延迟低于 50ms
- **按需加载**：Dashboard 和法律页面采用路由懒加载
- **二维码优化**：降低生成分辨率（256px）以减少内存占用
- **本地缓存**：链接数据缓存于 localStorage，减少 API 请求
- **用户索引**：避免全量扫描 KV，使用索引优化查询

## 运行测试

```bash
npm run test
```

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 发起 Pull Request

## 许可证

[![](https://www.gnu.org/graphics/agplv3-155x51.png "AGPL v3 logo")](https://www.gnu.org/licenses/agpl-3.0.txt)

Copyright (C) 2026 GEMILUXVII

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
