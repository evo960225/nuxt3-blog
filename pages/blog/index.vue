<template>
  <div class="flex justify-center ">
    <div class="grid grid-cols-3 gap-5 m-4 w-[1280px]">
      <div v-for="blog in blogListData" :key="blog.title">
        <NuxtLink :to="`/blog/${blog.date.split('-').slice(0,2).join('-')}/${blog.id}`">
          <div class="rounded-xl shadow-lg bg-white p-5 h-[200px]">
            <p class="text-lg">{{ blog.title }}</p>
            <div class="py-1">
              <p class="text-gray-400">{{ blog.date }}</p>
              <p class="text-gray-400">{{ blog.category }}</p>
            </div>
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