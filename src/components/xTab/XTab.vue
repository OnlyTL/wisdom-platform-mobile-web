<template>
  <div class="relative">
    <div class="flex items-center">
      <div
        class="relative flex items-center justify-center px-6 py-3 text-base font-medium transition-colors duration-300 cursor-pointer"
        :class="{
          'text-gray-8': activeTab === 0,
          'text-gray-7': activeTab !== 0,
          'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[6px] after:w-[48px] after:bg-primary  after:transition-transform after:duration-300':
            activeTab === 0
        }"
        @click="setActiveTab(0)"
      >
        账号登录
        <span class="mx-4 h-6 border-l border-gray-3"></span>
      </div>

      <div
        class="relative flex items-center justify-center px-6 py-3 text-base font-medium transition-colors duration-300 cursor-pointer"
        :class="{
          'text-gray-8': activeTab === 1,
          'text-gray-7': activeTab !== 1,
          'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[6px] after:w-[48px] after:bg-primary  after:transition-transform after:duration-300':
            activeTab === 1
        }"
        @click="setActiveTab(1)"
      >
        快捷登录
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0) // 当前选中的标签页索引

const setActiveTab = (index: number) => {
  activeTab.value = index
}
</script>
