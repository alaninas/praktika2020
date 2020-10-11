import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Counter from '../views/Counter.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Counter',
    component: Counter
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
