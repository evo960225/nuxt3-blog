// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-windicss',
    'nuxt-quasar-ui',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-simple-sitemap',
    'nuxt-security',
    '@nuxtjs/algolia'
  ],
  plugins: [
    
  ],
  build: {
    transpile: [
      'trpc-nuxt',
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons'
    ]
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
      host: process.env.HOST || 'localhost',
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
      origin: process.env.HOST || 'localhost',
      methods: '*',
    },
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        'base-uri': ["'self'"],
        'font-src': ["'self'", 'https:', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'img-src': ["'self'", 'data:', 'https://storage.googleapis.com/', 'https://*.google-analytics.com', 'https://*.googletagmanager.com',],
        'connect-src': [
          "'self'", 'https://*.algolia.net', 'https://*.algolianet.com', 'https://*.algolia.io', 
          'https://*.google-analytics.com', 'https://*.analytics.google.com', 'https://*.googletagmanager.com',
          process.dev ? 'ws://127.0.0.1' : ''],
        'object-src': ["'none'"],
        'script-src-attr': ['https://*.googletagmanager.com'],
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],
        'upgrade-insecure-requests': true
      }
    }
  },
  

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/styles/main.scss',
  ],
  
  app:{
    pageTransition: { name: 'page', mode: 'out-in' },
    head:{
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_TAG_ID}`,
          async: true,
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
    '/backstage/**': { ssr: false },
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
        'fontawesome-v6'
      ],
      svgIcons: [
        'material-icons',
        'fontawesome-v6'
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
})
