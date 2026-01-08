export default {
  header: {
    home: '首页',
    dashboard: '管理面板',
    login: '登录',
    logout: '退出登录',
    theme: {
      light: '切换到亮色模式',
      dark: '切换到暗色模式'
    }
  },
  home: {
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
      copySuccess: '链接已复制'
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
  }
}
