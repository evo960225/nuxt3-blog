
<template>
  <div id="app" class="flex justify-center flex-col w-full">
    <my-header />
    <div class="min-h-[calc(100vh-60px)] bg-white">
      <slot />
    </div>
    <my-footer />
  </div>
</template>
<script lang="ts">
useHead({
  
});
</script>

<style scoped>


</style>