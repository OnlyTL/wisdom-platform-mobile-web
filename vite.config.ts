import { ConfigEnv, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath, URL } from 'node:url'

/**
 * 根据配置环境生成 Vite 配置
 *
 * 此函数根据传入的命令和模式加载相应的环境变量，并基于这些变量生成 Vite 的用户配置
 * 它主要负责设置项目的基础路径、环境变量、别名、插件、定义、服务器配置、依赖优化以及构建配置
 *
 * @param {ConfigEnv} - 配置环境对象，包含命令和模式
 * @returns {UserConfig} - 生成的 Vite 用户配置对象
 */
export default ({ mode }: ConfigEnv): UserConfig => {
  // 获取当前工作目录作为项目根目录
  const root = process.cwd()
  // 根据模式和根目录加载环境变量
  const env = loadEnv(mode, root)
  return {
    base: env.VITE_PUBLIC_PATH,
    esbuild: {},
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      dedupe: ['vue']
    },
    plugins: [vue(), vueJsx(), vueDevTools()],
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    },
    server: {
      host: true,
      port: 5199,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://192.168.7.200:8888',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), '')
        }
      }
    },
    optimizeDeps: {
      include: [],
      exclude: ['vue-demi']
    },
    build: {
      outDir: 'dist'
    },
    css: {
      // 开启devSourcemap
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern"
        }
      }
    }
  }
}
