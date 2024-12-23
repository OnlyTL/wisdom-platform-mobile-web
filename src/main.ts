import './assets/main.css'
import 'vant/lib/index.css'

import { createApp } from 'vue'
import Vant from 'vant'

import App from './App.vue'
import router from './router'

import { setupStore } from '@/stores'
import { setUpVantGlobalApi } from '@/plugins/vantGlobalApi.ts'

const app = createApp(App)
app.use(router)

async function bootstrap() {
  // 加载状态存储
  setupStore(app)

  // 加载vant
  app.use(Vant)

  // 挂载全局API
  setUpVantGlobalApi()

  app.mount('#app')
}

bootstrap().then(() => {})
