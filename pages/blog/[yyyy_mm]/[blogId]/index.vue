<template>
  <div class="blog flex justify-center text-gray-700 m-4">
    <div class="rounded-xl shadow-lg bg-white p-3 w-[1280px] 
      md:(w-full p-2)">
      <h1>{{ blogData?.title }}</h1>
      <p>{{ blogData?.date }}</p>
      <p>{{ blogData?.category }}</p>
      <hr class="my-2 border-b border-gray-300">
      <div v-html="blogData?.contentHtml"></div>
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
.blog {
  & h1 {
    @apply text-3xl font-bold;
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