<template>
  <div class="size-full flex flex-col bg-[#CEF6E3]">
    <div class="h-[29%] flex items-center login-header">
      <div class="mx-4">
        <div class="text-base leading-6 text-gray-8 mb-1">您好，欢迎来到</div>
        <div class="text-2xl leading-8.5 text-gray-8">智慧能源EMS</div>
      </div>
    </div>
    <div class="h-[71%] w-full bottom-0 rounded-t-3xl bg-white px-8 pt-7.5">
      <LoginTab class="mb-4" v-model:value="loginType" />
      <van-form ref="formRef" v-if="loginType === 0" class="mb-10">
        <van-field
          class="mb-2.5"
          v-model="loginForm.tenantName"
          clearable
          required
          :rules="[{ required: true, message: '请输入租户名称' }]"
          placeholder="请输入租户名称"
        >
          <template #left-icon>
            <i class="iconfont icon-tenant !text-sm" />
          </template>
        </van-field>
        <van-field
          class="mb-2.5"
          v-model="loginForm.username"
          clearable
          required
          :rules="[{ required: true, message: '请输入账号' }]"
          autocomplete="username"
          placeholder="请输入账号"
        >
          <template #left-icon>
            <i class="iconfont icon-account !text-sm" />
          </template>
        </van-field>
        <van-field
          class="mb-2.5"
          v-model="loginForm.password"
          clearable
          required
          :rules="[{ required: true, message: '请输入密码' }]"
          autocomplete="current-password"
          type="password"
          placeholder="请输入密码"
        >
          <template #left-icon>
            <i class="iconfont icon-password !text-sm" />
          </template>
        </van-field>
        <van-field
          class="mb-2.5"
          v-model="loginForm.code"
          clearable
          required
          :rules="[{ required: true, message: '请输入验证码' }]"
          placeholder="请输入验证码"
        >
          <template #left-icon>
            <i class="iconfont icon-verification-code !text-sm" />
          </template>
          <template #right-icon>
            <div class="flex items-center">
              <div class="w-0.25 bg-gray-3 h-6 mr-2.5"></div>
              <img class="w-13 h-6 cursor-pointer" :src="codeImg" alt="" @click="getVerifyCode" />
            </div>
          </template>
        </van-field>
      </van-form>
      <van-form ref="formRef" v-else class="mb-10">
        <van-field
          class="mb-2.5"
          v-model="loginForm.tenantName"
          clearable
          required
          :rules="[{ required: true, message: '请输入手机号' }]"
          placeholder="请输入手机号"
        >
          <template #left-icon>
            <i class="iconfont icon-telephone !text-sm" />
          </template>
        </van-field>
        <van-field
          class="mb-2.5"
          v-model="loginForm.code"
          clearable
          required
          :rules="[{ required: true, message: '请输入验证码' }]"
          placeholder="请输入验证码"
        >
          <template #left-icon>
            <i class="iconfont icon-verification-code !text-sm" />
          </template>
          <template #right-icon>
            <span class="text-primary">获取验证码</span>
          </template>
        </van-field>
      </van-form>
      <van-button class="w-full !mb-3.5" type="primary" round :loading="loginLoading" @click="handleLogin">
        登录
      </van-button>
      <div class="flex mb-13.5">
        <van-radio name="1" shape="square" icon-size="12">
          <span class="text-xs">
            我已阅读并同意
            <span class="text-primary">《用户协议》</span>
            和
            <span class="text-primary">《隐私协议》</span>
          </span>
        </van-radio>
      </div>
      <div class="flex justify-center items-center mb-5">
        <div class="left-divider h-0.25 w-[18%]"></div>
        <div class="text-xs text-gray-7 mx-2.5">其他登录方式</div>
        <div class="right-divider h-0.25 w-[18%]"></div>
      </div>
      <div class="flex justify-center">
        <div
          class="size-8 rounded-full border border-primary flex justify-center items-center mr-10"
          @click="handleSocialLogin('wechat')"
        >
          <i class="iconfont icon-wechat text-primary" />
        </div>
        <div
          class="size-8 rounded-full border border-[#3296FA] flex justify-center items-center"
          @click="handleSocialLogin('dingTalk')"
        >
          <i class="iconfont icon-ding-talk text-[#3296FA]" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LoginTab from '@/views/base/login/LoginTab.vue'
import { getCodeImg, type LoginParam } from '@/api/manageCenter/auth'
import type { CaptchaCode } from '@/types'
import { ResultEnum } from '@/utils/enums/httpEnum.ts'
import type { FormInstance } from 'vant'
// 登录类型 0：账号登录 1：快捷登录
const loginType = ref<number>(0)
const loginForm = ref<LoginParam>({
  username: '',
  password: '',
  code: undefined,
  tenantName: '',
  uuid: ''
})
const loginLoading = ref(false)
const formRef = ref<FormInstance>()
const codeImg = ref('')
onMounted(() => {
  getVerifyCode()
})

// 获取验证码
const getVerifyCode = () => {
  getCodeImg<CaptchaCode>().then((res) => {
    if (res.code === ResultEnum.SUCCESS) {
      codeImg.value = 'data:image/gif;base64,' + res.data.img
      loginForm.value.uuid = res.data.uuid
    }
  })
}

const handleLogin = () => {
  formRef.value?.validate().then(() => {})
}
const handleSocialLogin = (type: 'wechat' | 'dingTalk') => {
  window.$FailToast('暂未开放')
}
</script>
<style scoped lang="scss">
.login-header {
  background-image: url('../../../assets/images/login-header-bg.png');
  background-size: cover;
}
.van-form {
  .van-cell {
    @apply py-3 px-0 border-b border-gray-3;
    :deep(.van-field__left-icon) {
      @apply mr-2.5 !important;
    }
  }
}
.left-divider {
  background: linear-gradient(90deg, rgba(204, 204, 204, 0) 0%, #cccccc 100%);
}
.right-divider {
  background: linear-gradient(90deg, #cccccc 0%, rgba(204, 204, 204, 0) 100%);
}
</style>
