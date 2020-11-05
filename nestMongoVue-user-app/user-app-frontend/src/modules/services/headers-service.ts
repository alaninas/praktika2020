import axios from 'axios'
import router from '@/router'
import { getAuthUserId, getIsAuth, getToken } from '@/modules/states/login'

const editFormUrl = /(http:\/\/localhost:3000\/users\/)([^/]{24})/

function routerRedirect (param: object) {
  router.push(param)
}

function resetHeaders () {
  axios.defaults.headers.common.Authorization = null
}

function reqInterceptor () {
  axios.interceptors.request.use(req => {
    const loggedToken = getToken()
    const isAuth = getIsAuth()
    const authUserId = getAuthUserId()
    console.log(`>> Request: ${req.method} ${req.url} ${JSON.stringify(req.headers.common)}`)
    req.headers.common.Authorization = loggedToken ? `Bearer ${loggedToken}` : null
    const userEditForm = req.url?.match(editFormUrl)
    if (userEditForm && !isAuth) {
      console.log('----> redirecting')
      routerRedirect({ name: 'Login' })
    }
    if (userEditForm && isAuth && userEditForm[2] !== authUserId) {
      console.log(`----> can not edit other users profiles: ${authUserId} -- ${userEditForm[2]}`)
      routerRedirect({ name: 'Users' })
    }
    console.log(`----> watched URL: ${req.url} TOKEN: ${loggedToken} LoggedIn: ${isAuth} UserId: ${authUserId}`)
    console.log(`>> Request UPDATED: ${req.method} ${req.url} ${JSON.stringify(req.headers.common)}`)
    return req
  })
}

function resInterceptor () {
  axios.interceptors.response.use(res => {
    console.log(`>> Response: ${res.status} ${JSON.stringify(res.headers)}`)
    if (res.status === 401) {
      console.log('----> Unauthorised access detected. Perform redirect')
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
