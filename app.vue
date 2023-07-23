<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Graph } from 'schema-dts';
import { useAdminStore } from '@/stores/admin' 
import { useJsonldStore } from '@/stores/jsonld'
const adminStore = useAdminStore()
const jsonldStore = useJsonldStore()
const route = useRoute()


const title = computed(() => route.meta.title? `${route.meta.title} - ` : '')
useHead({
  templateParams: {
      
  },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 孤獨的邊緣宅` : '孤獨的邊緣宅';
  },
  title: '',
  meta: [
    {
      name: 'description',
      content: '孤獨的邊緣宅，遊戲渣男！',
    },
    {
      name: 'charset',
      content: 'utf-8',
    }
  ],
  link: {
    rel: 'icon',
    type: 'image/x-icon',
    href: '/favicon.ico',
  },
})
 
onMounted(() =>
  useJsonld(() => jsonldStore.jsonld)
)

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