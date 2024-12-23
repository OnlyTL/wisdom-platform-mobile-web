<template>
  <div class="flex">
    <div
      class="flex flex-col items-center text-lg leading-6"
      :class="[value === 0 ? 'text-gray-8' : 'text-gray-7']"
      @click="handleChange(0)"
    >
      <div class="mb-1">账号登录</div>
      <div v-show="value === 0" class="w-12 h-1.5 bg-primary rounded-xl"></div>
    </div>
    <div class="w-0 h-4.5 border-r border-gray-6 mx-4.5 mt-1"></div>
    <div
      class="flex flex-col items-center text-lg leading-6"
      :class="[value === 1 ? 'text-gray-8' : 'text-gray-7']"
      @click="handleChange(1)"
    >
      <div class="mb-1">账号登录</div>
      <div v-show="value === 1" class="w-12 h-1.5 bg-primary rounded-xl"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  value: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:value'])

const handleChange = (index: number) => {
  emit('update:value', index)
}
</script>
