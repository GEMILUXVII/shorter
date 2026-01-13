import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue')
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/views/PrivacyView.vue')
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('@/views/TermsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
