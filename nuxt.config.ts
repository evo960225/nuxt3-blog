// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-quasar-ui',
    '@nuxtjs/i18n',
    // 'formidable'
  ],
  runtimeConfig: {
    public: {
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
    config: {
      notify: { 
       
      }
    },
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
  }

})
