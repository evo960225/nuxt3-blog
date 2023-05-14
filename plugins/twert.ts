export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('error-img', {
      beforeMount(el) {
      el.onerror = () => {
          el.src += "?timestamp=" + new Date().getTime();
      };
    },
  })
})