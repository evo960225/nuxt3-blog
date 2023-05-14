<template>
  <div class="text-gray-700 m-4">
    <div class="grid grid-cols-3 gap-5 ">
      <div v-for="blog in blogListData" :key="blog.title">
        <NuxtLink :to="`/blog/${blog.date.split('-').slice(0,2).join('-')}/${blog.id}`">
          <div class="rounded-xl shadow-lg bg-white p-3">
            <p>{{ blog.title }}</p>
            <p>{{ blog.date }}</p>
            <p>{{ blog.category }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: blogTableData } = await useFetch(`/api/blog/list`, {
  key: `mdData-${hashByTime(60*10)}`,
  method: 'GET',
})


const blogListData = ref(blogTableData.value?.data || [])



</script>

<style>


</style>