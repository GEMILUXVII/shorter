export default {
  header: {
    home: '首页',
    dashboard: '管理面板',
    login: '登录',
    logout: '退出登录',
    userMenuAriaLabel: '{user} 的用户菜单',
    theme: {
      light: '切换到亮色模式',
      dark: '切换到暗色模式'
    }
  },
  home: {
    title: '简化你的链接',
    subtitle: '输入长链接，生成简洁、优雅的短链接。',
    whyChoose: '为什么选择 Shorter?',
    features: {
      speed: {
        title: '极速响应',
        desc: '基于 Cloudflare 全球边缘网络，短链跳转延迟低于 50ms'
      },
      stats: {
        title: '数据统计',
        desc: '追踪每个短链的点击量，了解链接的传播效果'
      },
      secure: {
        title: '安全可靠',
        desc: '数据加密存储，支持 HTTPS，确保链接安全'
      }
    }
  },
  dashboard: {
    title: '管理面板',
    subtitle: '管理和分析您的所有短链接',
    popular: '热门链接',
    stats: {
      totalLinks: '总链接数',
      totalClicks: '总点击量',
      recentActivity: '最近活动'
    },
    empty: {
      noLinks: '暂无链接',
      createFirst: '创建您的第一个短链接',
      button: '创建短链',
      title: '还没有创建任何短链',
      desc: '前往首页创建您的第一个短链接'
    },
    list: {
      title: '我的短链',
      total: '共 {count} 条链接',
      search: '搜索链接...',
      clear: '清空',
      noMatch: '未找到匹配 "{query}" 的链接',
      deleteConfirm: '确定要删除所有链接吗？此操作不可恢复。',
      deleteSuccess: '链接已删除',
      clearSuccess: '所有链接已删除'
    },
    item: {
      clicks: '{count} 次点击',
      copy: '复制短链',
      copySuccess: '链接已复制',
      ariaLabel: '短链接: {url}',
      openLink: '在新标签页打开短链接 {url}',
      copyAriaLabel: '复制短链接 {url} 到剪贴板',
      openOriginal: '在新标签页打开原始链接 {url}',
      deleteAriaLabel: '删除短链接 {url}',
      statsLabel: '链接统计'
    }
  },
  stats: {
    totalLinks: '总链接数',
    totalClicks: '总点击量',
    todayLinks: '今日新增'
  },
  link: {
    placeholder: '在此输入长链接，例如 https://example.com/very/long/url',
    generate: '生成短链',
    processing: '生成中...',
    error: {
      invalidUrl: '请输入有效的网址',
      empty: '请输入网址',
      reservedCode: '该短码为系统保留，请更换',
      maxClicksInvalid: '请输入有效的数字',
      createFailed: '创建失败，请稍后重试'
    },
    success: '生成成功！',
    verification: '安全验证',
    verifying: '验证中...',
    verified: '已验证',
    verifyError: '验证失败',
    copy: '复制',
    copied: '已复制',
    qr: '二维码',
    options: {
      title: '高级选项',
      customCode: '自定义后缀 (可选)',
      customCodePlaceholder: '例如: my-link',
      expiry: '过期时间 (可选)',
      expiryPlaceholder: '选择日期和时间',
      password: '访问密码 (可选)',
      passwordPlaceholder: '设置访问密码',
      maxClicks: '最大点击次数 (可选)',
      maxClicksPlaceholder: '此时限制',
      note: '备注 (可选)',
      notePlaceholder: '仅自己可见',
      expiryChoices: {
        never: '永不过期',
        d1: '1 天',
        d7: '7 天',
        d30: '30 天'
      }
    }
  },
  auth: {
    join: '加入 Shorter',
    welcome: '欢迎回来',
    joinDesc: '让链接管理变得简单而优雅。',
    welcomeDesc: '登录以管理您的所有短链接。',
    email: '邮箱',
    emailPlaceholder: 'name@example.com',
    password: '密码',
    confirmPassword: '确认密码',
    passwordError: '密码至少6位',
    passwordMismatch: '两次密码不一致',
    submit: {
      processing: '处理中...',
      register: '创建账号',
      login: '立即登录'
    },
    switch: {
      hasAccount: '已有账号？',
      noAccount: '还没有账号？',
      toLogin: '去登录',
      toRegister: '免费注册'
    },
    toast: {
      registerSuccess: '注册成功！',
      loginSuccess: '登录成功！'
    }
  },
  footer: {
    tagline: '简洁、安全、快速的短链接服务',
    product: '产品',
    home: '首页',
    dashboard: '控制台',
    resources: '资源',
    changelog: '更新日志',
    legal: '法律',
    privacy: '隐私政策',
    terms: '服务条款',
    backToHome: '返回首页'
  },
  privacy: {
    title: '隐私政策',
    lastUpdated: '最后更新日期：2024年1月',
    sections: {
      collection: {
        title: '1. 信息收集',
        desc: '我们收集的信息仅限于提供服务所必需的最少数据：',
        items: [
          '账户信息：注册时提供的电子邮件地址',
          '链接数据：您创建的原始 URL 和生成的短链接',
          '访问统计：短链接的点击次数和基本访问时间',
          '技术信息：IP 地址、浏览器类型（用于安全和分析目的）'
        ]
      },
      usage: {
        title: '2. 信息使用',
        desc: '我们使用收集的信息用于：',
        items: [
          '提供和维护短链接服务',
          '向您展示链接访问统计数据',
          '检测和防止滥用、欺诈或安全威胁',
          '改进我们的服务质量'
        ]
      },
      sharing: {
        title: '3. 信息共享',
        desc: '我们不会出售、交易或以其他方式向外部方转让您的个人信息。我们可能会在以下情况下共享信息：',
        items: [
          '遵守法律要求或响应合法的法律程序',
          '保护我们的权利、隐私、安全或财产',
          '与提供基础设施服务的第三方（如 Cloudflare）合作'
        ]
      },
      security: {
        title: '4. 数据安全',
        desc: '我们采用行业标准的安全措施来保护您的数据，包括：',
        items: [
          '所有数据传输使用 HTTPS 加密',
          '密码使用安全的哈希算法存储',
          '定期审查和更新安全实践'
        ]
      },
      cookies: {
        title: '5. Cookie 使用',
        desc: '我们使用必要的 Cookie 来维护您的登录状态和偏好设置。这些 Cookie 对于服务的正常运行是必需的。'
      },
      rights: {
        title: '6. 您的权利',
        desc: '您有权：',
        items: [
          '访问您的个人数据',
          '更正不准确的数据',
          '删除您的账户和相关数据',
          '导出您的数据'
        ]
      },
      contact: {
        title: '7. 联系我们',
        desc: '如果您对本隐私政策有任何疑问，请通过 GitHub 仓库的 Issues 页面与我们联系。'
      },
      updates: {
        title: '8. 政策更新',
        desc: '我们可能会不时更新本隐私政策。任何更改都将在本页面上发布，并更新"最后更新日期"。继续使用我们的服务即表示您接受更新后的政策。'
      }
    }
  },
  terms: {
    title: '服务条款',
    lastUpdated: '最后更新日期：2024年1月',
    sections: {
      service: {
        title: '1. 服务说明',
        desc: 'Shorter 是一项免费的短链接生成服务，允许用户将长 URL 转换为短链接。本服务基于 Cloudflare 全球边缘网络构建，旨在提供快速、可靠的链接缩短体验。'
      },
      conditions: {
        title: '2. 使用条件',
        desc: '使用本服务即表示您同意遵守以下条款：',
        items: [
          '您必须年满 13 周岁才能使用本服务',
          '您需要对通过您的账户创建的所有链接负责',
          '您同意提供准确的账户信息',
          '您同意不会滥用本服务'
        ]
      },
      prohibited: {
        title: '3. 禁止行为',
        desc: '您不得使用本服务来：',
        items: [
          '创建指向非法、有害或恶意内容的链接',
          '传播恶意软件、病毒或其他有害代码',
          '进行网络钓鱼或欺诈活动',
          '侵犯他人的知识产权或隐私权',
          '发送垃圾邮件或进行未经授权的营销',
          '规避我们的安全措施或滥用系统资源',
          '创建指向成人内容、暴力内容或仇恨言论的链接'
        ]
      },
      management: {
        title: '4. 链接管理',
        desc: '我们保留以下权利：',
        items: [
          '删除违反本条款的任何链接',
          '暂停或终止违规用户的账户',
          '在必要时与执法机构合作',
          '修改或终止服务的任何部分'
        ]
      },
      availability: {
        title: '5. 服务可用性',
        desc: '我们努力保持服务的高可用性，但不保证服务将始终不间断或无错误。我们可能会因维护、升级或其他原因暂时中断服务。对于因服务中断造成的任何损失，我们不承担责任。'
      },
      disclaimer: {
        title: '6. 免责声明',
        desc: '本服务按"现状"提供，不提供任何明示或暗示的保证。我们不对以下情况承担责任：',
        items: [
          '短链接指向的第三方网站的内容或行为',
          '因使用本服务而导致的任何直接或间接损失',
          '数据丢失或服务中断',
          '第三方对您链接的访问或使用'
        ]
      },
      ip: {
        title: '7. 知识产权',
        desc: 'Shorter 服务及其相关的商标、标识和内容受知识产权法保护。本项目为开源项目，源代码在 MIT 许可证下发布。'
      },
      termination: {
        title: '8. 账户终止',
        desc: '您可以随时删除您的账户。我们也保留在您违反本条款时终止您账户的权利。账户终止后，您创建的链接可能会被删除或停用。'
      },
      changes: {
        title: '9. 条款修改',
        desc: '我们可能会不时修改本服务条款。重大变更将通过适当方式通知用户。继续使用本服务即表示您接受修改后的条款。'
      },
      contact: {
        title: '10. 联系方式',
        desc: '如果您对本服务条款有任何疑问或需要报告滥用行为，请通过 GitHub 仓库的 Issues 页面与我们联系。'
      }
    }
  }
}
