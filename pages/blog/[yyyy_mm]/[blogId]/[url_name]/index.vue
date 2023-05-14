<template>
  <div class="text-gray-700 m-4">
    <div class="grid grid-cols-3 gap-5 ">
      <div class="rounded-xl shadow-lg bg-white p-3">
        <h1>{{ blogData?.title }}</h1>
        <p>{{ blogData?.date }}</p>
        <p>{{ blogData?.category }}</p>
        <p v-html="blogData?.contentHtml"></p>

      </div>
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

<style>
</style>