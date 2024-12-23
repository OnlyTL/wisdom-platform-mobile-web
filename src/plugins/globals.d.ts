import { Notify, type NotifyOptions, type ToastOptions, type ToastWrapperInstance } from 'vant'

export {} // 确保这是一个模块

declare global {
  interface Window {
    $notify: (options: NotifyOptions | string) => Notify
    // Toast 全局方法
    $Toast: (options: string | ToastOptions) => ToastWrapperInstance

    // Loading Toast
    $LoadingToast: (options: string | ToastOptions) => ToastWrapperInstance

    // Success Toast
    $SuccessToast: (options: string | ToastOptions) => ToastWrapperInstance

    // Fail Toast
    $FailToast: (options: string | ToastOptions) => ToastWrapperInstance
  }
}
