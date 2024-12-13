<template>
  <div class="size-full flex flex-col">
    <main class="h-[calc(100%-50px)] bg-red-200">
      <RouterView />
    </main>
    <AppTabbar />
  </div>
</template>
<script setup lang="ts">
import AppTabbar from '@/layout/tabbar/AppTabbar.vue'
</script>
