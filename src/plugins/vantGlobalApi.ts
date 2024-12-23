import { showFailToast, showLoadingToast, showNotify, showSuccessToast, showToast } from 'vant'

export function setUpVantGlobalApi() {
  window.$notify = showNotify
  window.$Toast = showToast
  window.$Toast = showToast
  window.$LoadingToast = showLoadingToast
  window.$SuccessToast = showSuccessToast
  window.$FailToast = showFailToast
}
