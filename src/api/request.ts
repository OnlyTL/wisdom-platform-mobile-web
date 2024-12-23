import axios from 'axios'
import { storage } from '@/utils/storageUtil'
import { HEADER_AUTHORIZATION, HEADER_AUTHORIZATION_PREFIX, HEADER_TENANT_ID } from '@/utils/constant/common'
import { ACCESS_TOKEN, TENANT_ID } from '@/utils/constant/storageConstant'
import { RequestEnum, ResultEnum } from '@/utils/enums/httpEnum'
import { useUserStore } from '@/stores/modules/user'
import { useOnline } from '@vueuse/core'
import { getFileName } from '@/utils/fileUtil'

// 默认Content-Type为application/json
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000
})

// 定义响应接口
export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const online = useOnline()
    if (!online.value) {
      // 提示网络不在线
      window.$notify({ type: 'danger', message: '网络未连接，请检查网络' })
      // 可以选择抛出错误或返回一个拒绝的Promise
      return Promise.reject(new Error('网络连接已断开'))
    }
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    // 是否启用租户
    const isTenant = import.meta.env.VITE_TENANT_ENABLE || false
    // 添加版本3标识
    config.headers!['version'] = '3'
    if (storage.get(ACCESS_TOKEN) && !isToken) {
      config.headers![HEADER_AUTHORIZATION] = HEADER_AUTHORIZATION_PREFIX + storage.get(ACCESS_TOKEN)
    }
    if (isTenant) {
      config.headers![HEADER_TENANT_ID] = storage.get(TENANT_ID)
    }
    if (!isRepeatSubmit && (config.method === RequestEnum.POST || config.method === RequestEnum.PUT)) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime()
      }
      const sessionObj = storage.get('sessionObj')
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        storage.set('sessionObj', requestObj)
      } else {
        const s_url = sessionObj.url // 请求地址
        const s_data = sessionObj.data // 请求数据
        const s_time = sessionObj.time // 请求时间
        const interval = 10 * 1000 //小于10秒的视为重复提交
        if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
          return Promise.reject(new Error('请求正在处理，请勿重复提交'))
        } else {
          storage.set('sessionObj', requestObj)
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  async (response) => {
    // 处理文件下载
    const contentType = response.headers['content-type']
    const contentDisposition = response.headers['content-disposition']

    // 判断是否为文件响应
    if (
      (contentType && contentType.includes('application/octet-stream')) ||
      (contentType && contentType.includes('application/vnd.ms-excel')) ||
      (contentType && contentType.includes('application/vnd.openxmlformats-officedocument')) ||
      (contentDisposition && contentDisposition.includes('attachment'))
    ) {
      if (response.headers['import_error'] && response.headers['import_error'] === 'true') {
        window.$notify({ type: 'danger', message: '导入数据存在错误' })
      }
      // 获取文件名
      const fileName = contentDisposition ? getFileName(contentDisposition) : '下载文件'

      // 创建 Blob 对象
      const blob = new Blob([response.data], { type: contentType })

      // 创建下载链接并触发下载
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      return
    }
    // 二进制数据判断,比如请求类型是blob ，但是后端返回的是 json，则转为json
    if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
      const contentType = response.headers['content-type']
      if (contentType && contentType.includes('application/json')) {
        const text = await response.data.text()
        response.data = await JSON.parse(text)
      }
    }
    const code = response.data.code
    const msg = response.data.msg
    if (code === ResultEnum.LOGIN_EXPIRED) {
      // 登录状态已过期
      window.$notify({ type: 'danger', message: '登录状态已过期，请重新登录' })
      const userStore = useUserStore()
      await userStore.logout()
    } else if (code === ResultEnum.ERROR) {
      window.$notify({ type: 'danger', message: msg })
      return response.data
    } else if (code === ResultEnum.BAD_REQUEST) {
      window.$notify({ type: 'danger', message: msg })
      return response.data
    } else {
      return response.data
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
