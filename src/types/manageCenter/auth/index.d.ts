/**
 * 验证码
 */
export interface CaptchaCode {
  uuid: string
  img: string
  captchaEnabled: boolean
}

/**
 * 登录响应结果
 */
export interface LoginResult {
  access_token: string
  tenant_id: number
  expires_in: number
}

export interface UserInfo {
  user: {
    id: number
    nickName: string
    username: string
    avatar: string | undefined
    mobile: string
    loginDate: string
  }
  roles: string[]
  permissions: string[]
  tenant: {
    id: number
    name: string
    contactName: string
    contactMobile: string
    status: number
    domain: string
    renderPhoto: string
    logoPhoto: string
    packageId: number
    packageName: string
    expireDate: string
    accountCount: number
    remark: string
    updateTime: string
    locationId: string
    area: number
    numberPeople: number
  }
  tenantStatistics: {
    userTotal: number
    roleTotal: number
    accountCount: number
    tenantName: string
    logoPhoto: string
  }
}

// 记住账号
export interface RememberData {
  tenantName: string
  username: string
  password: string
  remember: boolean
}
