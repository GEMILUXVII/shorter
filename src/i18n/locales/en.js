export default {
  header: {
    home: 'Home',
    dashboard: 'Dashboard',
    login: 'Log In',
    logout: 'Log Out',
    theme: {
      light: 'Switch to Light Mode',
      dark: 'Switch to Dark Mode'
    }
  },
  home: {
    subtitle: 'Paste a long link to generate a clean, elegant short link.',
    whyChoose: 'Why Choose Shorter?',
    features: {
      speed: {
        title: 'Blazing Fast',
        desc: 'Powered by Cloudflare global edge network, redirect latency < 50ms.'
      },
      stats: {
        title: 'Analytics',
        desc: 'Track clicks for every link to understand your audience.'
      },
      secure: {
        title: 'Secure & Reliable',
        desc: 'Encrypted data storage with HTTPS support for total security.'
      }
    }
  },
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Manage and analyze all your links',
    popular: 'Popular Links',
    stats: {
      totalLinks: 'Total Links',
      totalClicks: 'Total Clicks',
      recentActivity: 'Recent Activity'
    },
    empty: {
      noLinks: 'No links yet',
      createFirst: 'Create your first short link',
      button: 'Create Link',
      title: 'No links created yet',
      desc: 'Go to home page to create your first short link'
    },
    list: {
      title: 'My Links',
      total: '{count} links total',
      search: 'Search links...',
      clear: 'Clear',
      noMatch: 'No links matching "{query}"',
      deleteConfirm: 'Are you sure you want to delete all links? This cannot be undone.',
      deleteSuccess: 'Link deleted',
      clearSuccess: 'All links deleted'
    },
    item: {
      clicks: '{count} clicks',
      copy: 'Copy link',
      copySuccess: 'Link copied'
    }
  },
  stats: {
    totalLinks: 'Total Links',
    totalClicks: 'Total Clicks',
    todayLinks: 'Added Today'
  },
  link: {
    placeholder: 'Paste a long link here, e.g., https://example.com/very/long/url',
    generate: 'Shorten',
    processing: 'Processing...',
    error: {
      invalidUrl: 'Please enter a valid URL',
      empty: 'Please enter a URL'
    },
    success: 'Shortened!',
    copy: 'Copy',
    copied: 'Copied',
    qr: 'QR Code',
    options: {
      title: 'Advanced Options',
      customCode: 'Custom Alias (Optional)',
      customCodePlaceholder: 'e.g. my-link',
      expiry: 'Expiration (Optional)',
      expiryPlaceholder: 'Select date & time',
      password: 'Password (Optional)',
      passwordPlaceholder: 'Set access password',
      maxClicks: 'Max Clicks (Optional)',
      maxClicksPlaceholder: 'Limit clicks',
      note: 'Note (Optional)',
      notePlaceholder: 'Private note',
      expiryChoices: {
        never: 'Never',
        d1: '1 Day',
        d7: '7 Days',
        d30: '30 Days'
      }
    }
  },
  auth: {
    join: 'Join Shorter',
    welcome: 'Welcome Back',
    joinDesc: 'Make link management simple and elegant.',
    welcomeDesc: 'Log in to manage all your links.',
    email: 'Email',
    emailPlaceholder: 'name@example.com',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    passwordError: 'At least 6 characters',
    passwordMismatch: 'Passwords do not match',
    submit: {
      processing: 'Processing...',
      register: 'Create Account',
      login: 'Sign In'
    },
    switch: {
      hasAccount: 'Already have an account?',
      noAccount: "Don't have an account?",
      toLogin: 'Log in',
      toRegister: 'Sign up'
    },
    toast: {
      registerSuccess: 'Registration successful!',
      loginSuccess: 'Logged in successfully!'
    }
  }
}
