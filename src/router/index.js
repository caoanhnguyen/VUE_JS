import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ViewRegister from '../views/ViewRegister.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import MyToDoView from '@/views/MyToDoView.vue'


const routes = [
  {
    path: '/',
    component: MainLayout, // "Chiếu" cái Bố cục này

    children: [
      {
        path: 'register2', // Bài tập Form ("/register2")
        name: 'register',
        component: ViewRegister
      },
      {
        path: 'login',
        name: 'login',
        component: LoginView
      },
      {
        path: 'todos',
        name: 'todo',
        component: MyToDoView
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Thêm cái này để "CSS .active" của bro "ăn"
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active'
})

export default router
