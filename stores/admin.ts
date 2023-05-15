import { defineStore } from 'pinia'

interface IAdminProfile {
  id: number | null
  nickname: string | null
  email: string | null
  loginToken: string | null
}

const storeName = 'admin'
export const useAdminStore = defineStore(storeName, {
  state: () => ({
    profile: {
      id: null,
      nickname: null,
      email: null,
      loginToken: null
    } as IAdminProfile
  }),
  actions: {
    async refreshProfile() {
      const { data: adminData, error } = await useFetch('/api/admin/profile', { 
        key: `admin-profile${hashByTime(60 * 10)}`
      })
      if (adminData.value && !error.value) {
        this.profile = adminData.value
      } else {
        this.clearUserProfile()
      }
      
    },

    setProfile(profileValue: IAdminProfile) {
      if (profileValue) {
        this.profile = profileValue
      } else {
        this.clearUserProfile()
      }
    },

    clearUserProfile() {
      this.profile = {
        id: null,
        nickname: null,
        email: null,
        loginToken: null
      }
    }
  },
})