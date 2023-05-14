<template>
  <div class="flex justify-center text-gray-700 m-4">
    <div class="rounded-xl shadow-lg bg-white p-8 w-[1280px] 
      md:(w-full p-2)">
      <h1 class="text-3xl font-bold">{{ blogData?.title }}</h1>
      <div class="my-3">
        <p class="text-gray-500">{{ blogData?.date }}</p>
        <p class="text-gray-500">{{ blogData?.category }}</p>
      </div>
      <hr class="my-2 border-b border-gray-300">
      <div v-html="blogData?.contentHtml" class="blog-content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { yyyy_mm, blogId } = route.params
const { data: blogData } = await useFetch(`/api/blog/${yyyy_mm}/${blogId}/html`, {
  key: `blogData-${hashByTime(60*10)}`,
  method: 'GET',
})



</script>

<style lang="scss">
.blog-content {
  & h1 {
    @apply text-3xl font-bold;
    line-height: 3rem;
  }
  & h2 {
    @apply text-2xl;
    line-height: 2.75rem;
  } 
  & h3 {
    @apply text-xl;
    line-height: 2.25rem;
  }
  & p {
    @apply text-base text-gray-600;
  }
  & img[alt='w-10%'] { width: 10%; display: inline; }
  & img[alt='w-20%'] { width: 20%; display: inline; }
  & img[alt='w-30%'] { width: 30%; display: inline; }
  & img[alt='w-40%'] { width: 40%; display: inline; }
  & img[alt='w-50%'] { width: 50%; display: inline; }
  & img[alt='w-60%'] { width: 60%; display: inline; }
  & img[alt='w-70%'] { width: 70%; display: inline; }
  & img[alt='w-80%'] { width: 80%; display: inline; }
  & img[alt='w-90%'] { width: 90%; display: inline; }
  & img[alt='w-100%'] { width: 100%; display: inline; }

  & [alt='inline'] { @apply inline; }
}
</style>