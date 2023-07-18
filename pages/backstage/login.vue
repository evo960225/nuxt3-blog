<template>
  <div>
    <div class="mt-12">
      <q-card class="my-card bg-secondary text-white min-w-[300px]">
        <q-card-section>
          <div class="text-h6">登入</div>
        </q-card-section>

        <q-card-section class="space-y-2" @keydown.enter="login">
          <q-input v-model="email" filled type="email" label="email" bg-color="white" />
          <q-input v-model="password" filled type="password" label="Password" bg-color="white" />
        </q-card-section>

        <q-separator dark />

        <q-card-actions class="flex justify-around">
          <q-btn color="light-green-6" class="!px-5" @click="login" >登入</q-btn>
          <q-checkbox dense v-model="rememberMail" label="記住信箱" color="orange" />
        </q-card-actions>
    </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '@/stores/admin'
import { useQuasar } from 'quasar'
const adminStore = useAdminStore()
const $q = useQuasar()
const rememberMail = ref()
const email = ref('')
const password = ref('')
const recaptcha = await useVueRecaptcha()
const accessTokenBackstage = useCookie('access_token_backstage', {
  watch: true,
})

onMounted(async() => { 
  email.value = localStorage.getItem('remember-backstage-mail') || ''
  rememberMail.value = !!localStorage.getItem('remember-backstage-mail')

})
async function login() {

  const token = await recaptcha('login')

  const { data, error } = await useCsrfFetch(`/api/backstage-auth/login`, {
    key: 'login' + Date.now().toString(),
    method: 'POST',
    body: {
      email: email.value,
      password: password.value,
      recaptchaToken: token
    },
  })

  if (error.value) {
    $q.notify({
      message: '登入失敗',
      color: 'negative',
      type: 'negative',
      position: 'top',
      timeout: 3000,
    })
    return 
  }

  if (rememberMail.value) {
    localStorage.setItem('remember-backstage-mail', email.value)
  }


  await adminStore.refreshProfile()

  $q.notify({
    message: '登入成功',
    color: 'positive',
    type: 'positive',
    position: 'top',
    timeout: 3000,
  })

  navigateTo('/backstage')

}

definePageMeta({
  layout: 'none',
});
</script>

<style>

</style>