// 获取文件名的函数

export const getFileName = (disposition: string): string => {
  let fileName = 'downloaded_file'

  // 处理 filename*=utf-8''... 格式
  const fileNameMatches = disposition.match(/filename\*=utf-8''([^;]+)/)
  if (fileNameMatches) {
    try {
      fileName = decodeURIComponent(fileNameMatches[1])
    } catch (e) {
      console.error('文件名解码失败:', e)
    }
    return fileName
  }

  // 处理 filename="..." 或 filename=... 格式
  const regularMatches = disposition.match(/filename=['"]?([^'";\n]+)['"]?/)
  if (regularMatches) {
    fileName = decodeURIComponent(regularMatches[1])
    return fileName
  }

  return fileName
}

/**
 * 下载 Blob 对象作为文件
 * @param blob
 * @param fileName
 */
export function downloadBlobAsFile(blob: Blob, fileName: string): void {
  // 创建一个 URL 对象，指向 Blob
  const blobUrl = URL.createObjectURL(blob)

  // 创建一个隐藏的 <a> 元素
  const link = document.createElement('a')

  // 设置下载的文件名
  link.download = fileName

  // 设置 <a> 元素的 href 属性为 Blob 的 URL
  link.href = blobUrl

  // 将 <a> 元素添加到 DOM 中，使其成为页面的一部分
  document.body.appendChild(link)

  // 程序化点击 <a> 元素以触发下载
  link.click()

  // 下载完成后移除 <a> 元素
  document.body.removeChild(link)

  // 释放 Blob URL
  URL.revokeObjectURL(blobUrl)
}

/**
 * 读取 照明运行报告 模板文件
 */
export async function readLightTemplateBlob(): Promise<Blob> {
  const url = new URL(`@/assets/template/照明运行报告模板.docx`, import.meta.url)
  const response = await fetch(url.href)
  return await response.blob()
}

export async function readLightTemplateBlobOnline(url: string): Promise<Blob> {
  const response = await fetch(url)
  return await response.blob()
}
