<template>
  <div>
    <div class="carrousel w-full h-30">
      <q-input v-model="mdData.title" color="teal" bg-color="white" dense outlined label="Label (stacked)" />

      
      <div>{{mdData?.title}}</div>
      <div>{{mdData?.date}}</div>
      <div>{{mdData?.category}}</div>
      <div>{{mdData?.content}}</div>
    </div>
  </div>
  
  
</template>

<script setup lang="ts">
const text = ref()
const { data: mdData } = useFetch(`/api/blog/2023-05/1/md`, {
  key: `mdData-${hashByTime(60*10)}`,
  method: 'GET',
},)
if (!mdData.value) {
  mdData.value = {
    title: '',
    date: '',
    category: '',
    content: '',
  }
}


</script>

<style>
</style>