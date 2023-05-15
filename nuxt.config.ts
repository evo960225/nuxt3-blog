// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-quasar-ui',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    jwtSignSecretbackstage: process.env.JWT_SIGN_SECRET_BACKSTAGE,
    public: {
      imageUrlBase: '/api/image',
      loginCookieMaxAge: 60 * 60 * 24 * 7,
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
