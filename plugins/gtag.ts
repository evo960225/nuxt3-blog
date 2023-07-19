import vueGtag from 'vue-gtag'


export default defineNuxtPlugin((nuxtApp) => {
  
  const runtimeConfig = useRuntimeConfig()
  const googleTagId = runtimeConfig.public.googleTagId as string || ''
  nuxtApp.vueApp.use(vueGtag, {
    config: {
      id: googleTagId
    }
  })
})