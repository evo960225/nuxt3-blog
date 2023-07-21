<template>
  <div class="flex justify-center ">
    <div class="grid grid-cols-3 gap-5 m-4 w-[1280px]" ref="container">
      <div v-for="(blog, index) in blogListData" :key="blog.id"
        ref="cardsRef"
        @mouseenter="startAnimation(index)"
        @mouseleave="reverseAnimation(index)"
      >
        <div>
          <NuxtLink :to="`/blog/${blog.date.split('-').slice(0,2).join('-')}/${blog.blogName}`">
            <div class="rounded-xl shadow-lg bg-white overflow-hidden">
              <div class="p-3">
                <h2 class="text-xl min-h-[3.5rem]">{{ blog.title }}</h2>
                <div class="py-1">
                  <p class="text-gray-400">{{ blog.date }}</p>
                  <p class="text-gray-400">{{ blog.category }}</p>
                </div>
              </div>
              <div class="relative pt-[60%] w-full">
                <img :src="blog.ogImage" 
                  class="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover"
                  :alt="blog.title"
                >
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { useJsonldStore } from '@/stores/jsonld'
import { ItemList, ListItem } from 'schema-dts';
const route = useRoute()
const { host } = useRuntimeConfig().public

const { data: blogTableData } = await useFetch(`/api/blog/list`, {
  key: `blog-list-${hashByTime(10)}`,
  method: 'GET',
})


const blogListData = ref(blogTableData.value?.data || [])



const cardsRef = ref<HTMLElement[]>([]);
const timelines: gsap.core.Timeline[] = [];

onMounted(() => {
  cardsRef.value.forEach((htmlElement, index) => {
    timelines[index] = gsap.timeline({ paused: true });
    timelines[index].to(htmlElement, { scale: 1.05, duration: 0.3 });
  });
});

const startAnimation = (index: number) => {
  timelines[index].play();
}
const reverseAnimation = (index: number) => {
  timelines[index].reverse();
}


const itemList: ItemList = {
  "@type": "ItemList",
  "description": "孤獨的邊緣宅",
  "image": `${host}/favicon.ico`,
  "itemListElement": [ 
    blogListData.value?.map((blog, index) => {
      return {
        "@type": "ListItem",
        "position": index + 1,
        "url": `${host}/blog/${blog.date.split('-').slice(0,2).join('-')}/${blog.blogName}`
      } as ListItem
    })
  ]
}

const jsonldStore = useJsonldStore() 
jsonldStore.setThings([itemList])

useHead({
  title: '邊緣宅部落',
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        
      }),
    },
  ],
})


</script>

<style>


</style>