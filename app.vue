<template>
  <div id="disqus_thread"></div>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAdminStore } from '@/stores/admin' 
const adminStore = useAdminStore()
const route = useRoute()


const title = computed(() => route.meta.title? `${route.meta.title} - ` : '')
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 孤獨的邊緣宅` : '孤獨的邊緣宅';
  },
  title: '',
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
    {
      name: 'charset',
      content: 'utf-8',
    }
  ],
  script: [
    { src: 'https://noobtw.github.io/likeco-btn/likeco-btn.js' },
    {
      children:`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.GOOGLE_TAG_ID}');
      `
    }
  ],
})

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0.1;
  filter: blur(0px);
}


</style>