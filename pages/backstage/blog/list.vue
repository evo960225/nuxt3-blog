<template>
  <div>
    <blogListTable></blogListTable>
  </div>
  <q-input v-model="text" :dense="true" />
  <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
</template>

<script setup lang="ts">
import blogListTable from './@components/blog-list-table.vue'
const text = ref()
const { data:mdData } = useFetch(`/api/blog/2023-05/1/md`, {
  key: `mdData-${hashByTime(60*10)}`,
  method: 'GET',
})

</script>

<style>
</style>