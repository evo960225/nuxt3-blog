// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-quasar-ui',
    '@nuxtjs/i18n',
  ],
  runtimeConfig: {
    public: {
    }
  },
  css: [
    
    //'quasar/fonts',
    'quasar/animations',
    'quasar/icons',
    'quasar/css',
    'quasar/brand',
    '@/assets/styles/main.scss',
  ],
  app:{
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  routeRules:{
    '/**': { swr: 600 },
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
        //'fontawesome-v6'
      ],
      svgIcons: [
        'material-icons',
        //'fontawesome-v6'
      ]
    },
    iconSet: 'material-icons',
  }

})
