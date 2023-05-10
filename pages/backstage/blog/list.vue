<template>
  <div>
    <blogListTable v-model:selected="tableSelected" :rows="tableData"></blogListTable>
  </div>
  <q-input v-model="text" :dense="true" />

</template>

<script setup lang="ts">
import blogListTable from './@components/blog-list-table.vue'
const tableSelected = ref<any[]>()
const text = ref()
const { data:mdData } = useFetch(`/api/blog/2023-05/1/md`, {
  key: `mdData-${hashByTime(60*10)}`,
  method: 'GET',
})
const tableData = ref<any[]>([
  {
    id: 1,
    title: 'title1',
    date: '2023',
    category: 'left',
  },
  {
    id: 2,
    title: 'title2',
    date: '20232',
    category: 'left',
  },
  {
    id: 3,
    title: 'title3',
    date: '20232',
    category: 'left',
  },
])

</script>

<style>
</style>