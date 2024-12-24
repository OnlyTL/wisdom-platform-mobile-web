<template>
  <van-config-provider :theme-vars="themeVars" theme-vars-scope="global" class="size-full">
    <RouterView />
  </van-config-provider>
</template>
<script setup lang="ts">
import { themeVars } from '@/setting/theme.config.ts'

import { SafeArea } from '@capacitor-community/safe-area'

SafeArea.enable({
  config: {
    customColorsForSystemBars: true,
    statusBarColor: '#00000000', // transparent
    statusBarContent: 'light',
    navigationBarColor: '#00000000', // transparent
    navigationBarContent: 'light'
  }
})
</script>
