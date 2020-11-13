import router from '@/router'

function routerRedirect (to: string) {
  router.push({ name: to })
}

function routerRedirectWId (to: string, id: string) {
  router.push({ name: to, params: { id } })
}

export {
  routerRedirect,
  routerRedirectWId
}
