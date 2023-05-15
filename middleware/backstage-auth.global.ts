import { useAdminStore } from "~/stores/admin";

export default defineNuxtRouteMiddleware(async(to, from)  => {
  if (process.client) { 
    const ls_dir = to.path.split('/')

    if (ls_dir[1] === 'backstage') {

      const cookie = useCookie('access_token_backstage')

      const adminStore = useAdminStore()

      // 有cookie但沒有profile，則驗證登入是否還有效
      if (cookie.value && !adminStore.profile.id) {
        await adminStore.refreshProfile()
      }
     
      // 前往login但已登入
      if (to.path === '/backstage/login') {
        if (adminStore.profile && adminStore.profile.id) {
          return await navigateTo('/backstage') 
        } 
      }
      // 前往後台但未登入
      else {
        if (!adminStore.profile || !adminStore.profile.id) {
          return await navigateTo('/backstage/login') 
        } 
        // if (!cookie.value) {
        //   return await navigateTo('/backstage/login') 
        // }
      }
    }
  }
})