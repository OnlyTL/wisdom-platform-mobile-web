<template>
  <van-tabbar v-model="active" class="mb-5">
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/energy">报表</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/alarm">告警</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/maintain">维保</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/user">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
</script>
