
<template>
  <div id="app" class="flex justify-center flex-col w-full">
    <my-header />
    <div class="min-h-[calc(100vh-108px)] w-full bg-white">
      <slot />
    </div>
    <my-footer />
    <transition name="fade">
      <button 
        id="btn-scroll-top"
        v-show="hasScrolled" @click="scrollToTop"
        class="fixed bottom-12 right-12 w-16 shadow-md rounded-full 
        transition duration-300
        border-3 border-orange-400 
        bg-white text-gray-600 hover:(text-gray-200 border-orange-200 aspect-ratio) 
        <sm:(bottom-3 right-3 w-12 border-2)
      ">
      <div class="relative w-full pt-[100%]">
        <Icon name="fa6-solid:arrow-up"   width="100%" height="100%"
          class="absolute top-0 bottom-0 left-0 right-0 m-auto p-4 <sm:(p-3)"  
        />
      </div>
      </button>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { useWindowScroll } from "@vueuse/core";
const { y } = useWindowScroll();
const hasScrolled = ref(false);

watchEffect(() => {
  hasScrolled.value = y.value > 100;
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

</script>

<style>
#btn-scroll-top.fade-enter-active, 
#btn-scroll-top.fade-leave-active{
  transition: opacity 0.3s;
}

#btn-scroll-top.fade-enter-from,
#btn-scroll-top.fade-leave-to
{
  opacity: 0;
}

</style>