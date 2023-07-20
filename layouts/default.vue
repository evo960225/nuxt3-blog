
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
  script: [
    { src: 'https://noobtw.github.io/likeco-btn/likeco-btn.js' },
    {
      children:`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.GOOGLE_TAG_ID}');
      `
    }
  ],
});
</script>

<style scoped>


</style>