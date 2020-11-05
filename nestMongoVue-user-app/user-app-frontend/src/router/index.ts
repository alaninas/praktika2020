import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { isAuthenticated } from '@/modules/states/login'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  },
  {
    path: '/users/edit/:id',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/Edit.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && isAuthenticated.value === true) {
    next({ name: 'Users' })
  } else {
    next()
  }
})

export default router
