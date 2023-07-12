
<template>
  <div id="app" class="flex justify-center flex-col w-full">
    <my-header />
    <div class="min-h-[calc(100vh-80px)] bg-cyan-50">
      <slot />
    </div>
    <my-footer />
  </div>
</template>

<style scoped>


</style>