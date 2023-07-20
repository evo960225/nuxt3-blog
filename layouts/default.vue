
<template>
  <div id="app" class="flex justify-center flex-col w-full">
    <my-header />
    <div class="min-h-[calc(100vh-108px)] bg-white">
      <slot />
    </div>
    <my-footer />
  </div>
</template>


<style scoped>


</style>