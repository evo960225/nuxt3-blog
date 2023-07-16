import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3';
import { useNuxtApp } from '#app';

const runtimeConfig = useRuntimeConfig()
export const useVueRecaptcha = () => {
  const { vueApp } = useNuxtApp();
  
  vueApp.use(VueReCaptcha, {
    siteKey: runtimeConfig.public.recaptchaSiteKey,
    loaderOptions: {
      autoHideBadge: true,
    },
  });

  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha() || {};
  if (!recaptchaLoaded || !executeRecaptcha) {
    throw new Error('recaptcha not loaded');
  }
  
  return async (action: string) => {
    await recaptchaLoaded();
    return await executeRecaptcha(action);
  };
};