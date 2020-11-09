import axios from 'axios'
import router from '@/router'
import { getAuthCredentials } from '@/modules/states/login'

const editFormUrl = /(http:\/\/localhost:3000\/users\/)([^/]{24})/

function routerRedirect (param: object) {
  router.push(param)
}

function resetHeaders () {
  axios.defaults.headers.common.Authorization = null
}

function reqInterceptor () {
  axios.interceptors.request.use(req => {
    const { userId, isAuthenticated, accessToken } = getAuthCredentials()
    req.headers.common.Authorization = accessToken ? `Bearer ${accessToken}` : null
    const userEditForm = req.url?.match(editFormUrl)
    if (userEditForm && !isAuthenticated) {
      routerRedirect({ name: 'Login' })
    }
    if (userEditForm && isAuthenticated && userEditForm[2] !== userId) {
      routerRedirect({ name: 'Users' })
    }
    return req
  })
}

function resInterceptor () {
  axios.interceptors.response.use(res => {
    if (res.status === 401) {
      routerRedirect({ name: 'Login' })
    }
    return res
  })
}

export {
  resetHeaders,
  reqInterceptor,
  resInterceptor
}
