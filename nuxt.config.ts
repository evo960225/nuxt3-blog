import { visualizer } from 'rollup-plugin-visualizer';

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    'nuxt-quasar-ui',
    'nuxt-icon',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-simple-sitemap',
    'nuxt-security', 
    '@nuxtjs/algolia',
    'nuxt-jsonld'
  ],
  plugins: [
    
  ],
  build: {
    transpile: [
      'trpc-nuxt',
      'nuxt-icon',
    ],
  },
  
  runtimeConfig: {
    blogsContentDir: process.env.BLOGS_CONTENT_DIR || '/',
    storageDir: process.env.STORAGE_DIR || '/',
    logsDir: process.env.LOGS_DIR || '/',
    jwtSignSecretbackstage: process.env.JWT_SIGN_SECRET_BACKSTAGE,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    firebaseImagesDest: process.env.FIREBASE_IMAGES_DEST,
    algoliaSecertKey: process.env.ALGOLIA_SECRET_KEY,
    public: {
      host: process.env.APP_HOST || 'localhost',
      siteUrl: process.env.APP_HOST || 'localhost',
      imageUrlBase: '/api/image',
      loginCookieMaxAge: 60 * 60 * 24 * 7,
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY ,
      algoliaId: process.env.ALGOLIA_ID,
      algoliaSearchKey: process.env.ALGOLIA_SEARCH_KEY,
      googleTagId: process.env.GOOGLE_TAG_ID,
    }
  },

  
  security: {
    csrf: false,
    corsHandler: {
      origin: process.env.APP_HOST || 'localhost',
      methods: '*',
    },
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        'base-uri': ["'self'"],
        'font-src': ["'self'", 'https:', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'img-src': ["'self'", "data:", "blob:", 
          'https://storage.googleapis.com/', 'https://*.google-analytics.com', 'https://*.googletagmanager.com',
        ],
        'connect-src': [
          "'self'", 'https://*.algolia.net', 'https://*.algolianet.com', 'https://*.algolia.io', 
          'https://*.google-analytics.com', 'https://*.analytics.google.com', 'https://*.googletagmanager.com',
          process.env.NODE_ENV === 'development' ? 'ws://127.0.0.1:24678' : ''],
        'object-src': ["'none'"],
        'script-src-attr': ['https://*.googletagmanager.com'],
        'script-src': ["'self'", "'unsafe-inline'", 
          'https://*.algolia.net', 'https://*.algolianet.com', 'https://*.algolia.io', 
          'https://storage.googleapis.com/','https://*.google-analytics.com', 'https://*.analytics.google.com', 'https://*.googletagmanager.com',
          'https://noobtw.github.io/likeco-btn/likeco-btn.js',
          'https://www.google.com/recaptcha/api.js','https://www.gstatic.com/recaptcha/'
        ],
        'frame-src': ["'self'", 'https://button.like.co/in/embed/lonelyfeizhai/', 'https://www.google.com/recaptcha/', 'https://store.steampowered.com/widget/'],
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],
        'upgrade-insecure-requests': true
      }
    }
  },
  

  css: [
    '@/assets/styles/main.scss',
    '@unocss/reset/tailwind.css'
  ],
  
  app:{
    pageTransition: { name: 'page', mode: 'out-in' },
    head:{
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_TAG_ID}`,
          async: true,
        },
        {
          children:`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GOOGLE_TAG_ID}');
          `
        },
        // {
        //   src: 'https://lonely-fei-zhai.disqus.com/embed.js',
        //   "data-timestamp": + new Date(),
        // },
      ]
    }
  },
  

  routeRules:{
    '/**': { },
    '/backstage/blog/**': { 
      ssr: false, 
      security: {
        xssValidator: false,
      },
      index: false, // sitemap
    },
    '/api/blog/**': { 
      security: {
        xssValidator: false,
      },
    },
  },

  sitemap: {
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'lastmod', width: '25%' },
      { label: 'Priority', select: 'sitemap:priority', width: '12.5%' },
      { label: 'Change Frequency', select: 'sitemap:changefreq', width: '12.5%' },
    ], 
    
  },

  quasar: {
    plugins: [
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
      'Dark',
    ],

    extras: {
      fontIcons: [
        'material-icons',
      ],
      svgIcons: [
        'material-icons',
      ]
    },
    iconSet: 'material-icons',
  },

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  trpc: {
    baseURL: '', // Set empty string (default) to make requests by relative address
    endpoint: '/trpc', // defaults to /trpc
    installPlugin: true, // defaults to true. Add @trpc/client plugin and composables
  },

  typescript: {
    strict: true // required to make input/output types work
  },

  vite: {
    build: {
      rollupOptions: {
        plugins: [
          visualizer(),
        ]
      },
    },
  },
  nitro: {
    compressPublicAssets: { gzip:false, brotli: true },
    publicAssets: [{
      maxAge: 60 * 60 * 24 * 7
    }]
  }

})
