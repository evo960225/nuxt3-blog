<template>
  <div class="flex flex-col justify-center items-center">
    <!-- 最新內容 -->
    <div class="mt-24 w-[1280px]">
      <h2 class="p-3 text-3xl tracking-widest text-center  "> ---- 最新內容 ---- </h2>
      <div class="grid grid-cols-3 gap-8 my-12 w-[1280px]" ref="container">

        <!-- card -->
        <div v-for="(blog, index) in blogListData" :key="blog.id"
          ref="cardsRef"
        >
          <div class="">
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
                bg-orange-500  -right-3 -top-2.5
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
                  <p class="text-xl tracking-widest text-white">{{ blog.title }}</p>
                  <p class="p-0 text-transparent text-left italic
                  transition-all duration-600 max-h-0 group-hover:(!block max-h-[140px] !text-gray-300 pt-4)">{{ blog.description }}</p>
                </div>

                <div class="relative pt-[70%] w-full rounded-xl overflow-hidden 
                  filter transition duration-500 ease-in-out
                  group-hover:(blur-[4px] brightness-[0.65])
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
              <p class="text-gray-400 text-right">{{ blog.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 熱門 -->
    <div class="mt-16 w-[1280px]">
      <h2 class="p-3 text-3xl tracking-widest text-center  "> ---- 熱門內容 ---- </h2>
      <div class="grid grid-cols-3 gap-8 my-12 w-[1280px]" ref="container">
        
        <!-- card -->
        <div v-for="(blog, index) in blogListData" :key="blog.id"
          ref="cardsRef"
        >
          <div class="">
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
                bg-orange-500  -right-3 -top-2.5
                ">
                  <!-- <p class="text-white">{{ blog.date }}</p> -->
                  <p class="text-white">{{ blog.category }}</p>
                </div>

                <!-- rounded -->
                <div class="
                  absolute bottom-0 z-1 flex items-end
                  px-4 py-3 w-full min-h-[80px]
                  text-justify  rounded-xl overflow-hidden
                  bg-gradient-to-t from-cool-gray-900/80 from-40% via-cool-gray-900/70 to-gray-500/0  backdrop-blur-[1px]
                ">
                  <p class="text-xl tracking-widest text-white">{{ blog.title }}</p>
                  <p class="p-0 text-transparent text-left italic
                  transition-all duration-600 max-h-0 group-hover:(!block max-h-[140px] !text-gray-300 pt-4)">{{ blog.description }}</p>
                </div>

                <div class="relative pt-[70%] w-full rounded-xl overflow-hidden 
                  filter transition duration-500 ease-in-out
                  group-hover:(blur-[4px] brightness-[0.65])
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
              <p class="text-gray-400 text-right">{{ blog.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';

const { data: blogTableData } = await useFetch(`/api/blog/list`, {
  key: `blog-list-${hashByTime(10)}`,
  method: 'GET',
})

const blogListData = ref(blogTableData.value?.data || [])




onMounted(() => {


});


</script>

<style>


</style>