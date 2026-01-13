<div align="center">
  <img src="public/favicon.svg" alt="Shorter Logo" width="160" />
</div>

# <div align="center">Shorter</div>

<div align="center">
  <strong>Modern URL Shortener | Elegant Link Management</strong>
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
  <a href="#project-overview">Overview</a> |
  <a href="#features">Features</a> |
  <a href="#quick-start">Quick Start</a> |
  <a href="#deployment">Deployment</a> |
  <a href="#api-documentation">API Docs</a> |
  <a href="https://shorter-7sc.pages.dev">Demo</a>
</div>

<div align="center">
  <a href="README.md">中文</a> | <strong>English</strong>
</div>

---

## Project Overview

Shorter is a modern full-stack URL shortening service built with JAMstack architecture. The frontend is powered by Vue 3, the backend uses Cloudflare Workers serverless functions, and data is stored in Cloudflare KV. The entire application is deployed on Cloudflare's global edge network, providing ultra-fast link redirection.

### Design Philosophy

Following a "Fresh and Refined" design approach:

- Light Mode: Warm cream tones with flowing aurora background effects
- Dark Mode: Deep midnight theme with purple gradient accents
- Emphasis on white space and micro-animations for a calm, focused experience
- Uses oklch color system for perceptually uniform colors

### Architecture Overview

```
User Request --> Cloudflare CDN --> Vue SPA (Frontend)
                                --> Workers Functions (API)
                                --> Cloudflare KV (Storage)
```

## Preview

<details>
<summary>Click to see interface preview</summary>
<div align="center">
  <h3>Home</h3>
  <img src="public/home.png" alt="Shorter Home" width="80%" />
  <br><br>
  <h3>Dashboard</h3>
  <img src="public/dashboard.png" alt="Shorter Dashboard" width="80%" />
</div>
</details>

## Features

### Core Features

- **Instant Link Generation**: Paste a long URL, get a 6-character short code instantly
- **Custom Short Codes**: Support custom aliases for branded short links
- **QR Code Generation**: Auto-generated downloadable QR codes for every link
- **Click Analytics**: Real-time tracking of click counts for each link

### Advanced Options

- **Link Expiration**: 1 day, 7 days, 30 days, or never expire
- **Password Protection**: Secure sensitive links with passwords (SHA-256 salted hash)
- **Click Limits**: Set maximum clicks, auto-expire when reached
- **Private Notes**: Add notes visible only to yourself

### Security Features

- **Cloudflare Turnstile**: Invisible human verification to prevent abuse
- **JWT Authentication**: Secure tokens using HMAC-SHA256
- **Password Salting**: Each password uses a unique random salt
- **Reserved Codes**: Prevents using system paths as short codes

### User Experience

- **Dark/Light Mode**: One-click toggle with preference persistence
- **Internationalization**: Full Chinese and English support
- **Responsive Design**: Adapts to desktop, tablet, and mobile
- **Smooth Animations**: Fade-in, beam sweep, aurora flow visual effects

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- Cloudflare account

### Local Development

```bash
# Clone the repository
git clone https://github.com/GEMILUXVII/shorter.git
cd shorter

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local and add your Turnstile Site Key

# Start the frontend development server
npm run dev

# In another terminal, start the backend (requires wrangler.toml configuration)
npx wrangler pages dev dist --kv LINKS_KV --kv USERS_KV
```

Frontend runs at `http://localhost:5173`, API proxied to `http://localhost:8787`.

### Production Build

```bash
npm run build
```

Build output is in the `dist/` directory.

## Deployment

### 1. Create KV Namespaces

```bash
# Create production namespaces
npx wrangler kv namespace create LINKS_KV
npx wrangler kv namespace create USERS_KV

# Create preview namespaces
npx wrangler kv namespace create LINKS_KV --preview
npx wrangler kv namespace create USERS_KV --preview
```

Note the returned namespace IDs.

### 2. Configure Wrangler

```bash
cp wrangler.toml.example wrangler.toml
```

Edit `wrangler.toml` and fill in the KV namespace IDs:

```toml
[[kv_namespaces]]
binding = "LINKS_KV"
id = "your-LINKS_KV-namespace-id"
preview_id = "your-LINKS_KV-preview-namespace-id"

[[kv_namespaces]]
binding = "USERS_KV"
id = "your-USERS_KV-namespace-id"
preview_id = "your-USERS_KV-preview-namespace-id"
```

### 3. Configure Environment Variables

Add the following environment variables in your Cloudflare Pages project settings:

| Variable               | Description                                                |
| ---------------------- | ---------------------------------------------------------- |
| `JWT_SECRET`           | JWT signing key (recommended: 32+ character random string) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key                            |

### 4. Deploy

```bash
npm run build
npx wrangler pages deploy dist
```

## API Documentation

### Authentication Endpoints

| Method | Path                 | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | User registration     |
| POST   | `/api/auth/login`    | User login            |
| GET    | `/api/auth/me`       | Get current user info |

### Link Endpoints

| Method | Path                  | Description                                         |
| ------ | --------------------- | --------------------------------------------------- |
| POST   | `/api/links`          | Create short link (requires Turnstile verification) |
| GET    | `/api/links`          | Get user's link list (requires auth)                |
| DELETE | `/api/links?code=xxx` | Delete a link (requires auth)                       |

### Redirect Endpoints

| Method | Path     | Description                               |
| ------ | -------- | ----------------------------------------- |
| GET    | `/:code` | Redirect to original URL                  |
| POST   | `/:code` | Password verification for protected links |

### Data Models

**Link Object**

```javascript
{
  id: string,           // Unique identifier
  code: string,         // Short code (6 characters)
  originalUrl: string,  // Original URL
  shortUrl: string,     // Full short URL
  clicks: number,       // Click count
  createdAt: number,    // Creation timestamp
  expiresAt: number,    // Expiration timestamp (optional)
  password: string,     // Encrypted password (optional)
  maxClicks: number,    // Maximum clicks (optional)
  note: string,         // Note (optional)
  userId: string        // User ID (optional)
}
```

## Tech Stack

### Frontend

| Technology   | Version | Purpose               |
| ------------ | ------- | --------------------- |
| Vue          | 3.5     | Reactive UI framework |
| Vite         | 7.x     | Build tool            |
| Tailwind CSS | 4.x     | Utility-first CSS     |
| Pinia        | 3.x     | State management      |
| vue-i18n     | 11.x    | Internationalization  |
| qrcode       | 1.5     | QR code generation    |
| nanoid       | 5.x     | Short code generation |

### Backend

| Technology           | Purpose                          |
| -------------------- | -------------------------------- |
| Cloudflare Workers   | Serverless runtime               |
| Cloudflare KV        | Key-value storage                |
| Cloudflare Turnstile | Human verification               |
| Web Crypto API       | Password hashing and JWT signing |

## Project Structure

```
shorter/
├── public/                  # Static assets
│   └── favicon.svg          # Website icon
├── src/
│   ├── components/
│   │   ├── common/          # Common components (Button, Toast, Turnstile)
│   │   ├── features/        # Feature components (LinkGenerator, AuthModal, LinkList)
│   │   └── layout/          # Layout components (AppHeader, AppFooter)
│   ├── composables/         # Composition functions
│   │   ├── useApi.js        # API request wrapper
│   │   ├── useAuth.js       # Authentication state management
│   │   ├── useClipboard.js  # Clipboard operations
│   │   └── useToast.js      # Toast notifications
│   ├── i18n/
│   │   ├── locales/         # Language files (zh.js, en.js)
│   │   └── index.js         # i18n configuration
│   ├── router/              # Router configuration
│   ├── stores/              # Pinia stores
│   │   └── linkStore.js     # Link data management
│   ├── utils/               # Utility functions
│   │   ├── validators.js    # URL validation
│   │   └── shortId.js       # Short code generation
│   ├── views/               # Page components
│   │   ├── HomeView.vue     # Home page
│   │   ├── DashboardView.vue # Dashboard
│   │   ├── PrivacyView.vue  # Privacy policy
│   │   └── TermsView.vue    # Terms of service
│   ├── App.vue              # Root component
│   ├── main.js              # Entry file
│   └── style.css            # Global styles
├── functions/               # Cloudflare Workers functions
│   ├── [code].js            # Short link redirect handler
│   └── api/
│       ├── links.js         # Link CRUD operations
│       └── auth/[action].js # Authentication handler
├── index.html
├── vite.config.js           # Vite configuration
├── wrangler.toml            # Workers configuration
└── package.json
```

## Performance Optimizations

- **Edge Computing**: 200+ global Cloudflare nodes, redirect latency under 50ms
- **Lazy Loading**: Dashboard and legal pages use route-based lazy loading
- **QR Code Optimization**: Reduced resolution (256px) to minimize memory usage
- **Local Caching**: Link data cached in localStorage to reduce API requests
- **User Index**: Avoids full KV scans with optimized index queries

## Running Tests

```bash
npm run test
```

## Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[![](https://www.gnu.org/graphics/agplv3-155x51.png "AGPL v3 logo")](https://www.gnu.org/licenses/agpl-3.0.txt)

Copyright (C) 2026 GEMILUXVII

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
