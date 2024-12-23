import request, { type Result } from '@/api/request'
import { RequestEnum } from '@/utils/enums/httpEnum'

// 登录参数定义
export interface LoginParam {
  username: string
  password: string
  tenantName: string
  code: number | undefined
  uuid: string
  [key: string]: string | number | undefined
}

/**
 * 获取验证码
 */
export function getCodeImg<T>(): Promise<Result<T>> {
  return request({
    url: '/code',
    headers: {
      isToken: false
    },
    method: RequestEnum.GET
  })
}

/**
 * 登录
 * @param data
 * @returns
 */
export function login<T>(data: LoginParam): Promise<Result<T>> {
  return request({
    url: '/auth/login',
    headers: {
      isToken: false
    },
    method: RequestEnum.POST,
    data: data
  })
}

/**
 * 获取用户信息
 */
export function getInfo<T>(): Promise<Result<T>> {
  return request({
    url: '/identity/sys_user/getInfo',
    method: RequestEnum.GET
  })
}

/**
 * 退出登录
 */
export function logout() {
  return request({
    url: '/auth/logout',
    method: RequestEnum.DELETE
  })
}

// 1.7 根据租户名称查看租户信息
export function getTenantByName<T>(name: string): Promise<Result<T>> {
  return request({
    url: '/identity/sys_tenant/getNameTenant',
    method: 'get',
    params: {
      name
    }
  })
}
