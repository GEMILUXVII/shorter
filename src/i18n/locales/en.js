export default {
  header: {
    home: 'Home',
    dashboard: 'Dashboard',
    login: 'Log In',
    logout: 'Log Out',
    userMenuAriaLabel: 'User menu for {user}',
    theme: {
      light: 'Switch to Light Mode',
      dark: 'Switch to Dark Mode'
    }
  },
  home: {
    title: 'Simplify your links',
    subtitle: 'Paste a long link to generate a clean, elegant short link.',
    whyChoose: 'Why Choose Shorter?',
    whyChooseSubtitle: 'Enterprise-grade link shortening powered by Cloudflare global edge network.',
    stats: {
      edgeNodes: 'Global Edge Nodes',
      avgLatency: 'Avg Response Time',
      uptime: 'Service Uptime',
      freeLinks: 'Free Links'
    },
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
      copySuccess: 'Link copied',
      ariaLabel: 'Short link: {url}',
      openLink: 'Open short link {url} in new tab',
      copyAriaLabel: 'Copy short link {url} to clipboard',
      openOriginal: 'Open original URL {url} in new tab',
      deleteAriaLabel: 'Delete short link {url}',
      statsLabel: 'Link statistics'
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
      empty: 'Please enter a URL',
      reservedCode: 'This code is reserved, please choose another',
      maxClicksInvalid: 'Please enter a valid number',
      createFailed: 'Failed to create, please try again'
    },
    success: 'Shortened!',
    verification: 'Security Check',
    verifying: 'Verifying...',
    verified: 'Verified',
    verifyError: 'Verification failed',
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
  },
  footer: {
    tagline: 'Simple, secure, and fast link shortening service',
    product: 'Product',
    home: 'Home',
    dashboard: 'Dashboard',
    resources: 'Resources',
    changelog: 'Changelog',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    backToHome: 'Back to Home'
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated: January 2024',
    sections: {
      collection: {
        title: '1. Information Collection',
        desc: 'We only collect the minimum data necessary to provide our service:',
        items: [
          'Account Information: Email address provided during registration',
          'Link Data: Original URLs and generated short links you create',
          'Access Statistics: Click counts and basic access times for short links',
          'Technical Information: IP address, browser type (for security and analytics)'
        ]
      },
      usage: {
        title: '2. Information Usage',
        desc: 'We use the collected information to:',
        items: [
          'Provide and maintain the link shortening service',
          'Display link access statistics to you',
          'Detect and prevent abuse, fraud, or security threats',
          'Improve our service quality'
        ]
      },
      sharing: {
        title: '3. Information Sharing',
        desc: 'We do not sell, trade, or otherwise transfer your personal information to external parties. We may share information in the following cases:',
        items: [
          'To comply with legal requirements or respond to lawful legal processes',
          'To protect our rights, privacy, safety, or property',
          'With third parties providing infrastructure services (such as Cloudflare)'
        ]
      },
      security: {
        title: '4. Data Security',
        desc: 'We employ industry-standard security measures to protect your data, including:',
        items: [
          'HTTPS encryption for all data transmission',
          'Secure hashing algorithms for password storage',
          'Regular review and updates to security practices'
        ]
      },
      cookies: {
        title: '5. Cookie Usage',
        desc: 'We use essential cookies to maintain your login status and preferences. These cookies are necessary for the proper functioning of the service.'
      },
      rights: {
        title: '6. Your Rights',
        desc: 'You have the right to:',
        items: [
          'Access your personal data',
          'Correct inaccurate data',
          'Delete your account and associated data',
          'Export your data'
        ]
      },
      contact: {
        title: '7. Contact Us',
        desc: 'If you have any questions about this Privacy Policy, please contact us through the Issues page on our GitHub repository.'
      },
      updates: {
        title: '8. Policy Updates',
        desc: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Continued use of our service indicates acceptance of the updated policy.'
      }
    }
  },
  terms: {
    title: 'Terms of Service',
    lastUpdated: 'Last Updated: January 2024',
    sections: {
      service: {
        title: '1. Service Description',
        desc: 'Shorter is a free link shortening service that allows users to convert long URLs into short links. This service is built on the Cloudflare global edge network to provide a fast and reliable link shortening experience.'
      },
      conditions: {
        title: '2. Terms of Use',
        desc: 'By using this service, you agree to the following terms:',
        items: [
          'You must be at least 13 years old to use this service',
          'You are responsible for all links created through your account',
          'You agree to provide accurate account information',
          'You agree not to abuse this service'
        ]
      },
      prohibited: {
        title: '3. Prohibited Activities',
        desc: 'You may not use this service to:',
        items: [
          'Create links to illegal, harmful, or malicious content',
          'Distribute malware, viruses, or other harmful code',
          'Engage in phishing or fraudulent activities',
          'Infringe on intellectual property or privacy rights of others',
          'Send spam or conduct unauthorized marketing',
          'Circumvent our security measures or abuse system resources',
          'Create links to adult content, violent content, or hate speech'
        ]
      },
      management: {
        title: '4. Link Management',
        desc: 'We reserve the right to:',
        items: [
          'Delete any links that violate these terms',
          'Suspend or terminate accounts of violating users',
          'Cooperate with law enforcement when necessary',
          'Modify or terminate any part of the service'
        ]
      },
      availability: {
        title: '5. Service Availability',
        desc: 'We strive to maintain high service availability but do not guarantee uninterrupted or error-free service. We may temporarily suspend service for maintenance, upgrades, or other reasons. We are not liable for any losses caused by service interruptions.'
      },
      disclaimer: {
        title: '6. Disclaimer',
        desc: 'This service is provided "as is" without any express or implied warranties. We are not responsible for:',
        items: [
          'Content or behavior of third-party websites linked through short links',
          'Any direct or indirect losses resulting from using this service',
          'Data loss or service interruption',
          'Third-party access or use of your links'
        ]
      },
      ip: {
        title: '7. Intellectual Property',
        desc: 'The Shorter service and its associated trademarks, logos, and content are protected by intellectual property laws. This project is open source, with source code released under the MIT license.'
      },
      termination: {
        title: '8. Account Termination',
        desc: 'You may delete your account at any time. We also reserve the right to terminate your account if you violate these terms. Upon account termination, your created links may be deleted or deactivated.'
      },
      changes: {
        title: '9. Terms Modifications',
        desc: 'We may modify these Terms of Service from time to time. Significant changes will be communicated to users through appropriate means. Continued use of this service indicates acceptance of the modified terms.'
      },
      contact: {
        title: '10. Contact Information',
        desc: 'If you have any questions about these Terms of Service or need to report abuse, please contact us through the Issues page on our GitHub repository.'
      }
    }
  }
}
