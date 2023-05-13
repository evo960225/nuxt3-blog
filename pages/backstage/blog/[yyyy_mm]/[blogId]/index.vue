<template>
  <div>
    <div>
      <div class="w-full p-5">
        <div class="flex items-center justify-between">
          <NuxtLink @click="$router.back()" class="flex items-center cursor-pointer my-2">
            <q-icon name="arrow_left" color="white" size="2.5rem" />
            <div class="text-xl">返回</div>
          </NuxtLink>
          <q-btn color="green-7" label="更新" @click="updateContent" />
        </div>
        <div class="p-2 space-y-2">
          <q-input v-model="mdData.title" color="teal" bg-color="white" dense outlined label="標題" />
          <q-input v-model="mdData.date" color="teal" bg-color="white" dense outlined label="日期" />
          <q-input v-model="mdData.category" color="teal" bg-color="white" dense outlined label="分類" />
          <div class="min-h-[200px]">
            <q-input v-model="mdData.content" color="teal" bg-color="white" dense outlined  type="textarea" label="內容" />
          </div>
        </div>
      </div>
      <q-inner-loading :showing="isLoading">
        <q-spinner-audio
          color="lime-5"
          size="8em"
        />
      </q-inner-loading>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
const $q = useQuasar()
const route = useRoute()
const { yyyy_mm, blogId } = route.params
const isLoading = ref(false)

const { data: mdData } = await useFetch(`/api/blog/${yyyy_mm}/${blogId}/md`, {
  key: `mdData-${hashByTime(60*10)}`,
  method: 'GET',
})


async function updateContent() {
  isLoading.value = true

  const { data, error } = await useFetch(`/api/blog/${yyyy_mm}/${blogId}/update`, {
    key: `mdData.post-${hashByTime(60*10)}`,
    method: 'POST',
    body: mdData.value
  })

  if (error.value) {
    $q.notify({
      message: '更新失敗',
      color: 'negative',
      type: 'negative',
      position: 'top',
      timeout: 3000,
    })
    isLoading.value = false
    return
  }

  $q.notify({
    message: '更新成功',
    color: 'positive',
    type: 'positive',
    position: 'top',
    timeout: 3000,
  })
  isLoading.value = false
}


</script>

<style>
</style>