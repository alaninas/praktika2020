import axios from 'axios'
import { getAuthCredentials } from '@/modules/states/login'
import { routerRedirect } from '@/modules/utilities/router-utility'

const editFormUrl = /(http:\/\/localhost:3000\/users\/)([^/]{24})/

function resetHeaders () {
  axios.defaults.headers.common.Authorization = null
}

function reqInterceptor () {
  axios.interceptors.request.use(req => {
    const { userId, isAuthenticated, accessToken } = getAuthCredentials()
    req.headers.common.Authorization = accessToken ? `Bearer ${accessToken}` : null
    const userEditForm = req.url?.match(editFormUrl)
    if (userEditForm && !isAuthenticated) {
      routerRedirect('Login')
    }
    if (userEditForm && isAuthenticated && userEditForm[2] !== userId) {
      routerRedirect('Users')
    }
    return req
  })
}

function resInterceptor () {
  axios.interceptors.response.use(res => {
    if (res.status === 401) {
      routerRedirect('Login')
    }
    return res
  })
}

export {
  resetHeaders,
  reqInterceptor,
  resInterceptor
}
