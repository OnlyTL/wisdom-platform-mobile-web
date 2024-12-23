import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { storage } from '@/utils/storageUtil'
import { ACCESS_TOKEN, TENANT_ID } from '@/utils/constant/storageConstant'
import type { LoginResult } from '@/types'

export interface AuthState {
  accessToken: string
  expiresIn: number
  tenantId: number
}

export const useAuthStore = defineStore('auth', () => {
  // state
  const authInfo = ref<AuthState>({
    accessToken: '',
    expiresIn: 0,
    tenantId: 0
  })

  // getters
  const getAccessToken = computed(() => authInfo.value.accessToken)
  const getExpiresIn = computed(() => authInfo.value.expiresIn)
  const getTenantId = computed(() => authInfo.value.tenantId)

  // actions
  /**
   * 设置token
   * @param data 登录响应数据
   */
  function setToken(data: LoginResult) {
    authInfo.value = {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      tenantId: data.tenant_id
    }
    storage.set(ACCESS_TOKEN, authInfo.value.accessToken)
    storage.set(TENANT_ID, authInfo.value.tenantId)
  }

  /**
   * 清除token
   */
  function clearToken() {
    authInfo.value = {
      accessToken: '',
      expiresIn: 0,
      tenantId: 0
    }
    storage.remove(ACCESS_TOKEN)
    storage.remove(TENANT_ID)
  }

  return {
    authInfo,
    getAccessToken,
    getExpiresIn,
    getTenantId,
    setToken,
    clearToken
  }
})
