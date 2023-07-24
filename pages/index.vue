<template>
  <div class="flex justify-center items-center w-full">
    <div class="max-w-[1280px] w-full">
      <!-- 最新內容 -->
      <div class="mt-24 <lg:mt-10 <sm:mt-5">
        <h2 class="p-3 text-3xl tracking-widest text-center <sm:text-xl"> ---- 最新內容 ---- </h2>
        <div ref="container" class="columns-3 gap-4 my-12 w-full max-w-[1280px] 
          <lg:(columns-2 my-6) <md:(columns-1)
        ">

          <!-- card -->
          <div v-for="(blog, index) in blogListData" :key="blog.id"
            ref="cardsRef" 
          >
            <div class="p-3 <lg:(mx-5) <sm:(p-2)">
              <NuxtLink :to="`/blog/${blog.date.split('-').slice(0,2).join('-')}/${blog.blogName}`">
                <div class="
                  group
                  relative rounded-xl shadow-lg 
                  bg-orange-500 
                  border-box
                ">
                  <div class="absolute z-1 
                    px-4 py-1.5
                    shadow-[0px, 5px, 1px, #000] drop-shadow-lg
                  bg-orange-500 -right-3 -top-2.5
                    <sm:(-right-2 -top-1.5 text-sm)
                  ">
                    <p class="text-white">{{ blog.category }}</p>
                  </div>

                  <!-- rounded -->
                  <div class="
                    absolute bottom-0 z-1 flex items-end
                    px-4 py-3 w-full min-h-[80px]
                    text-justify  rounded-xl overflow-hidden
                    bg-gradient-to-t from-cool-gray-900/80 from-40% via-cool-gray-900/70 to-gray-500/0  backdrop-blur-[1px]
                  ">
                    <p class="text-xl tracking-widest text-white <sm:text-lg">{{ blog.title }}</p>
                    <p class="p-0 text-transparent text-left italic
                    transition-all duration-600 max-h-0 group-hover:(!block max-h-[140px] !text-gray-300 pt-4)">{{ blog.description }}</p>
                  </div>

                  <div class="relative pt-[70%] w-full rounded-xl overflow-hidden 
                    filter transition duration-500 ease-in-out
                    group-hover:(blur-[4px] brightness-[0.65])
                    <sm:(pt-[50%])
                  ">
                    <img :src="blog.ogImage" 
                      class="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover"
                      :alt="blog.title"
                    >
                  </div>
                </div>
                
              </NuxtLink>
              <!-- card footer -->
              <div class="px-2 py-1"> 
                <p class="text-gray-400 text-right <sm:text-sm">{{ blog.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 熱門 -->
      <div class="mt-24 max-w-[1280px] w-full <lg:mt-10 <sm:mt-5">
        <h2 class="p-3  text-3xl tracking-widest text-center <sm:text-xl"> ---- 熱門內容 ---- </h2>
        <div ref="container" class="columns-3 gap-4 my-12 w-full max-w-[1280px] 
          <lg:(columns-2 my-6) <md:(columns-1)
        ">

          <!-- card -->
          <div v-for="(blog, index) in blogListData" :key="blog?.id"
            ref="cardsRef" 
          >
          <div class="p-3 <lg:(mx-5) <sm:(p-2)">
              <NuxtLink :to="`/blog/${blog.date.split('-').slice(0,2).join('-')}/${blog.blogName}`">
                <div class="
                  group
                  relative rounded-xl shadow-lg 
                  bg-orange-500 
                  border-box
                ">
                  <div class="absolute z-1 
                    px-4 py-1.5
                    shadow-[0px, 5px, 1px, #000] drop-shadow-lg
                  bg-orange-500 -right-3 -top-2.5
                    <sm:(-right-2 -top-1.5 text-sm)
                  ">
                    <p class="text-white">{{ blog.category }}</p>
                  </div>

                  <!-- rounded -->
                  <div class="
                    absolute bottom-0 z-1 flex items-end
                    px-4 py-3 w-full min-h-[80px]
                    text-justify  rounded-xl overflow-hidden
                    bg-gradient-to-t from-cool-gray-900/80 from-40% via-cool-gray-900/70 to-gray-500/0  backdrop-blur-[1px]
                  ">
                    <p class="text-xl tracking-widest text-white <sm:text-lg">{{ blog.title }}</p>
                    <p class="p-0 text-transparent text-left italic
                    transition-all duration-600 max-h-0 group-hover:(!block max-h-[140px] !text-gray-300 pt-4)">{{ blog.description }}</p>
                  </div>

                  <div class="relative pt-[70%] w-full rounded-xl overflow-hidden 
                    filter transition duration-500 ease-in-out
                    group-hover:(blur-[4px] brightness-[0.65])
                    <sm:(pt-[50%])
                  ">
                    <img :src="blog.ogImage" 
                      class="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover"
                      :alt="blog.title"
                    >
                  </div>
                </div>
                
              </NuxtLink>
              <!-- card footer -->
              <div class="px-2 py-1"> 
                <p class="text-gray-400 text-right <sm:text-sm">{{ blog.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';

const { data: blogTableData } = await useAsyncData('blogListData',
  () => $fetch(`/api/blog/list`, {
    method: 'GET',
  })
)
const blogListData = computed(() => blogTableData.value?.data || [])




onMounted(() => {


});

useSeoMeta({
  ogTitle: '孤獨的邊緣宅',
  description: '孤獨的邊緣宅，遊戲渣男！', 
  ogDescription: '孤獨的邊緣宅，遊戲渣男！',
  ogImage: '@/assets/images/og-image.webp',
  twitterImage: '@/assets/images/og-image.webp',
  twitterDescription:'孤獨的邊緣宅，遊戲渣男！',
  twitterCard: 'summary_large_image',
})


</script>

<style>


</style>