import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/layout/AppLayout.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: '/energy',
          name: 'energy',
          component: () => import('@/views/energy/HomeView.vue')
        },
        {
          path: '/alarm',
          name: 'alarm',
          component: () => import('@/views/alarm/HomeView.vue')
        },
        {
          path: '/maintain',
          name: 'maintain',
          component: () => import('@/views/maintain/HomeView.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user/HomeView.vue')
        }
      ]
    }
  ]
})

export default router