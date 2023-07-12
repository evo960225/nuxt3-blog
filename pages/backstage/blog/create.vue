<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import { date, useQuasar } from 'quasar'
const $q = useQuasar()

const { data: createResult, error } = await useFetch('/api/blog/create', {
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
} else {
  await navigateTo(`/backstage/blog/${createResult.value?.yyyy_mm}/${createResult.value?.blogId}`)
}

</script>

<style>

</style>