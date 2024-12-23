<template>
  <van-config-provider :theme-vars="themeVars" theme-vars-scope="global" class="size-full">
    <RouterView />
  </van-config-provider>
</template>
<script setup lang="ts">
import { themeVars } from '@/setting/theme.config.ts'
</script>
