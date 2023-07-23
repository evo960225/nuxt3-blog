import { defineStore } from 'pinia'
import { Person, WebSite, BlogPosting, WebPage, Organization, Graph, Thing } from 'schema-dts';


export const useJsonldStore = defineStore('jsonld', () => {
  const runtimeConfig = useRuntimeConfig()
  const host = runtimeConfig.public.host
  const me = ref<Person>({
    "@type": "Person",
    "@id": `${host}/about`,
    name: '孤獨的邊緣宅',
    disambiguatingDescription: '遊戲渣男',
    image: {
      "@type": "ImageObject",
      "@id": `${host}/favicon.ico`,
      "url": `${host}/favicon.ico`,
      "caption": "孤獨的邊緣宅",
      "inLanguage": "zh-TW"
    },
    sameAs: [
      "https://www.facebook.com/lonely.fei.zhai",
      "https://medium.com/@evo960225",
    ],
    url: `${host}`,
  })

  const org = ref<Organization>({
    "@type": 'Organization',
    name: '孤獨的邊緣宅',
  })
  
  const webSite = ref<WebSite>({
    '@type': 'WebSite',
    '@id': `${host}`,
    url: host,
    name: '孤獨的邊緣宅',
    publisher: {
      "@id": `${host}/about`
    },
    inLanguage: "zh-TW"
  })

  const webPage = ref<WebPage>({
    '@type': 'WebPage',
    '@id': `${host}`,
    url: host,
    name: '孤獨的邊緣宅',
    publisher: {
      "@id": `${host}/about`
    },
    inLanguage: "zh-TW"
  })

  const things = ref<Thing[]>()
  const jsonld = computed(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': ([me.value, org.value, webSite.value, webPage.value] as Thing[]).concat(things.value || [])
    } as Graph
  })

  function setThings(_things: Thing[]) {
    things.value = _things;
  }

  return { things, setThings, jsonld }
})