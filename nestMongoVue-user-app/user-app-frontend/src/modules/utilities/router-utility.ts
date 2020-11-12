import router from '@/router'

function routerRedirect (to: string) {
  router.push({ name: to })
}

export {
  routerRedirect
}
