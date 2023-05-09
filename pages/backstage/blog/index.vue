<template>
  <div>
    <div class="carrousel w-full h-30">
      <div>{{mdData?.title}}</div>
      <div>{{mdData?.date}}</div>
      <div>{{mdData?.category}}</div>
      <div>{{mdData?.content}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data:mdData } = useFetch(`/api/blog/2023-05/1/md`, {
  key: `mdData-${hashByTime(60*10)}`,
  method: 'GET',
})

</script>

<style>
</style>