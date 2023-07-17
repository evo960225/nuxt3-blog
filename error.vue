<template>
  <div class="relative font-sans" n="green6">
    <div class="container max-w-200 mx-auto py-10 px-4">
      <h1>{{ error.message }}</h1>
      <h2 class="text-3xl">404</h2>
      {{ '你的頁面找不到喔' }}
      <br>
      <button class="bg-sky-500 rounded-md px-4 py-2" @click="handleError">
        回首頁
      </button>
      <br>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
