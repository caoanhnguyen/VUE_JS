import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'), // Lazy load MainLayout

    children: [
      {
        path: 'register2', // Bài tập Form ("/register2")
        name: 'register',
        component: () => import('@/views/ViewRegister.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/LoginView.vue')
      },
      {
        path: 'todos',
        name: 'todo',
        component: () => import('@/views/MyToDoView.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Thêm cái này để "CSS .active" của bro "ăn"
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
})

export default router
