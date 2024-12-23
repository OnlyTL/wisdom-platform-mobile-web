import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getInfo, login as loginApi, logout as logoutApi, type LoginParam } from '@/api/manageCenter/auth'
import { ResultEnum } from '@/utils/enums/httpEnum'
import { useAuthStore } from '@/stores/modules/auth'
import router from '@/router'
import type { LoginResult, UserInfo } from '@/types'

export const useUserStore = defineStore('user', () => {
  // state
  const userInfo = ref<UserInfo | null>(null)

  const isSuperAdmin = computed(() => {
    if (userInfo.value) {
      const { roles } = userInfo.value
      return roles.includes('super_admin')
    }
    return false
  })

  // 登录
  async function login(loginParams: LoginParam) {
    const result = await loginApi<LoginResult>(loginParams)
    if (result.code === ResultEnum.SUCCESS) {
      // 缓存 Token
      const authStore = useAuthStore()
      authStore.setToken(result.data)
    }
    return result
  }

  // 获取用户信息
  async function getUserInfo() {
    const result = await getInfo<UserInfo>()
    if (result.code === ResultEnum.SUCCESS) {
      userInfo.value = result.data
    }
    return result
  }

  // 退出
  async function logout() {
    // 清空 user store
    userInfo.value = null

    await logoutApi()
    const authStore = useAuthStore()
    authStore.clearToken()
    //
    await router.push('/login')
  }

  return {
    userInfo,
    login,
    getUserInfo,
    logout,
    isSuperAdmin
  }
})
