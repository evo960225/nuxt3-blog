<template>
  <div class="flex justify-center ">



    <div class="grid grid-cols-3 gap-6 my-9 w-[1280px]" ref="container">
      



      <div v-for="(blog, index) in blogListData" :key="blog.id"
        ref="cardsRef"
        @mouseenter="startAnimation(index)"
        @mouseleave="reverseAnimation(index)"
      >
        <div class="">
          <NuxtLink :to="`/blog/${blog.date.split('-').slice(0,2).join('-')}/${blog.blogName}`">
            <div class="relative rounded-xl shadow-lg 
              bg-orange-500 border-5 
              border-orange-500
              border-box
              
            ">
              <div class="absolute z-1 
                px-4 py-1.5
              bg-orange-500 rounded-tr-xl rounded-bl-xl  -right-1 -top-1
              ">
                <!-- <p class="text-white">{{ blog.date }}</p> -->
                <p class="text-white">{{ blog.category }}</p>
              </div>

              <!-- rounded -->
              <!-- <div class="rounded-xl overflow-hidden"> -->
                <div class="
                  absolute bottom-0 z-1 flex items-end
                  px-4 py-3 min-h-[56px] w-full min-h-[80px]
                  text-justify  rounded-xl overflow-hidden
                  bg-gradient-to-t from-gray-800 to-fuchsia-100/0 
                ">
                  <p class="text-xl tracking-widest text-white">{{ blog.title }}</p>
                </div>

                <div class="relative pt-[60%] w-full rounded-xl overflow-hidden">
                  <img :src="blog.ogImage" 
                    class="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover"
                    :alt="blog.title"
                  >
                </div>
              <!-- </div> -->
            </div>
          </NuxtLink>
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


const cardsRef = ref<HTMLElement[]>([]);
const timelines: gsap.core.Timeline[] = [];

onMounted(() => {
  cardsRef.value.forEach((htmlElement, index) => {
    timelines[index] = gsap.timeline({ paused: true });
    timelines[index].to(htmlElement, { scale: 1.03, duration: 0.3 });
  });

});

const startAnimation = (index: number) => {
  timelines[index].play();
}
const reverseAnimation = (index: number) => {
  timelines[index].reverse();
}


</script>

<style>


</style>