// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-windicss',
    'nuxt-quasar-ui',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    blogsContentDir: process.env.BLOGS_CONTENT_DIR || '/',
    storageDir: process.env.STORAGE_DIR || '/',
    logsDir: process.env.LOGS_DIR || '/',
    jwtSignSecretbackstage: process.env.JWT_SIGN_SECRET_BACKSTAGE,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    firebaseImagesDest: process.env.FIREBASE_IMAGES_DEST,
    public: {
      imageUrlBase: '/api/image',
      loginCookieMaxAge: 60 * 60 * 24 * 7,
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY 
    }
  },
  css: [
    '@/assets/styles/main.scss',
  ],
  app:{
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  routeRules:{
    '/**': { },
    '/backstage/**': { ssr: false },
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

})
