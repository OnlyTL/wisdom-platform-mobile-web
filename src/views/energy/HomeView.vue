<template>
  <div class="size-full content">
    <div class="bg-red-400 safe w-full"></div>
    <div class="mb-5">上面是状态栏高度</div>

    <van-button type="primary" @click="takePicture">点击拍照</van-button>
    <img :src="imageSrc" alt="" class="size-10" />

    <div class="pt-5">
      <p>
        点击拨打电话：
        <a class="text-blue" href="javascript:void(0);" @click="callPhone('18392888125')">183 9288 8125</a>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { ref } from 'vue'

const imageSrc = ref()
const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri,
    source: CameraSource.Prompt,
    promptLabelPhoto: '从相册选择',
    promptLabelPicture: '拍照'
  })
  console.log(image)
  imageSrc.value = image.webPath

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,

  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  // imageSrc.value = image.base64String

  // Can be set to the src of an image now
}

import { Browser } from '@capacitor/browser'

const callPhone = async (phoneNumber: string) => {
  try {
    await Browser.open({ url: `tel:${phoneNumber}` })
  } catch (error) {
    console.error('拨打电话失败:', error)
    // 可以添加一些用户友好的错误提示
    alert('无法拨打电话，请检查您的设备是否支持拨号功能')
  }
}
</script>

<style scoped lang="scss">
.content {
  padding-top: var(--safe-area-inset-top);
}
.safe {
  height: var(--safe-area-inset-top);
}
</style>
