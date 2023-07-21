import { defineStore } from 'pinia'
import { Person, WebSite, BlogPosting, WebPage, Organization, Graph, Thing } from 'schema-dts';

const host = process.env.HOST || 'http://localhost:3000';

const me: Person = {
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
  }
};

const org: Organization = {
  "@type": 'Organization',
  name: '孤獨的邊緣宅',
};

const webSite: WebSite = {
  '@type': 'WebSite',
  '@id': `${host}`,
  url: host,
  name: '孤獨的邊緣宅',
  publisher: {
    "@id": `${host}/about`
  },
  inLanguage: "zh-TW"
}

const webPage: WebPage = {
  '@type': 'WebPage',
  '@id': `${host}`,
  url: host,
  name: '孤獨的邊緣宅',
  publisher: {
    "@id": `${host}/about`
  },
  inLanguage: "zh-TW"
}

export const useJsonldStore = defineStore('jsonld', () => {
  const things = ref<Thing[]>()
  const jsonld = computed(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': ([me, org, webSite, webPage] as Thing[]).concat(things.value || [])
    } as Graph
  })

  function setThings(_things: Thing[]) {
    things.value = _things;
  }

  return { things, setThings, jsonld }
})