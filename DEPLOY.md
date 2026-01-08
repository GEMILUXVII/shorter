# Cloudflare Pages 部署教程

## 前置准备

1. 注册 [Cloudflare 账号](https://dash.cloudflare.com/sign-up)
2. 安装 Wrangler CLI（已包含在项目依赖中）

## 步骤一：登录 Cloudflare

```bash
npx wrangler login
```

浏览器会打开，按提示授权。

## 步骤二：创建 KV 命名空间

```bash
# 创建生产环境 KV
npx wrangler kv namespace create LINKS_KV
npx wrangler kv namespace create USERS_KV

# 创建预览环境 KV
npx wrangler kv namespace create LINKS_KV --preview
npx wrangler kv namespace create USERS_KV --preview
```

记下输出的 `id` 值。

## 步骤三：配置 wrangler.toml

将上一步获得的 ID 填入 `wrangler.toml`：

```toml
[[kv_namespaces]]
binding = "LINKS_KV"
id = "你的生产环境ID"
preview_id = "你的预览环境ID"
```

## 步骤四：构建并部署

```bash
# 构建前端
npm run build

# 部署到 Cloudflare Pages
npx wrangler pages deploy dist
```

首次部署会提示创建项目，选择：
- 项目名称：`shorter`（或你喜欢的名称）
- 生产分支：`main`

## 步骤五：访问

部署成功后，Cloudflare 会分配一个域名：
- `https://shorter.pages.dev`（或你的项目名）

## 后续更新

每次修改后重新部署：

```bash
npm run build && npx wrangler pages deploy dist
```

## 自定义域名（可选）

1. 进入 Cloudflare Dashboard → Pages → shorter → Custom domains
2. 添加你的域名并配置 DNS
