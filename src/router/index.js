// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Guest.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/Register.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
