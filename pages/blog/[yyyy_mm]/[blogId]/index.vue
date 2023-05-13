<template>
  <div class="blog flex justify-center text-gray-700 m-4">
    <div class="rounded-xl shadow-lg bg-white p-3 w-[1280px] 
      md:(w-full p-2)">
      <h1>{{ blogData?.title }}</h1>
      <p>{{ blogData?.date }}</p>
      <p>{{ blogData?.category }}</p>
      <hr class="my-2 border-b border-gray-300">
      <p v-html="blogData?.contentHtml"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { yyyy_mm, blogId } = route.params
const { data: blogData } = await useFetch(`/api/blog/${yyyy_mm}/${blogId}/html`, {
  key: `mdData-${hashByTime(60*10)}`,
  method: 'GET',
})



</script>

<style lang="scss">
.blog {
  & h1 {
    @apply text-3xl font-bold;
  }
  & p {
    @apply text-base text-gray-600;
  }

}
</style>