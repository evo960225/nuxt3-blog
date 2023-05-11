<template>
  <div>
    <blogListTable 
      v-model:selected="tableSelected" 
      :rows="tableData" 
      :api-url="`/api/blog/list`"
      ref="refTable"
    >
    </blogListTable>
    <q-input v-model="text" :dense="true" />
  </div>

</template>

<script setup lang="ts">
import blogListTable from './@components/blog-list-table.vue'
const tableSelected = ref<any[]>()
const text = ref()
const refTable = ref()
const tableData = ref<any[]>([])




</script>

<style>
</style>