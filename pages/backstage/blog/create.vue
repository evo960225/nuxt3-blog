<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import { date, useQuasar } from 'quasar'
const $q = useQuasar()

const { data: createResult, error } = await useFetch<IBlog>('/api/blog/create', {
  key: 'create' + Date.now().toString(),
  method: 'POST',
})

if (!createResult.value || error.value) {
  $q.notify({
    message: '新增失敗',
    color: 'negative',
    type: 'negative',
    position: 'top',
    timeout: 3000,
  })
} else if (createResult.value) {
  const yyyy_mm = date.formatDate(createResult.value?.date, 'YYYY-MM')
  await navigateTo(`/backstage/blog/${yyyy_mm}/${createResult.value?.title}`)
}
</script>

<style>

</style>