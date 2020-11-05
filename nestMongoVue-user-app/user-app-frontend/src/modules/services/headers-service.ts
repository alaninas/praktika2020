import axios from 'axios'
import router from '@/router'
import { getLog, getToken, loginData } from '@/modules/states/login'

const editFormUrl = /(http:\/\/localhost:3000\/users\/)([^/]{24})/

function resetHeaders () {
  axios.defaults.headers.common.Authorization = null
}

function reqInterceptor () {
  axios.interceptors.request.use(req => {
    const loggedToken = getToken().value
    const isLogged = getLog().value
    console.log(`>> Request: ${req.method} ${req.url} ${JSON.stringify(req.headers.common)}`)
    req.headers.common.Authorization = loggedToken ? `Bearer ${loggedToken}` : null
    const match = req.url?.match(editFormUrl)
    if (match && !isLogged) {
      console.log('----> redirecting')
      router.push({ name: 'Login' })
    }
    if (match && isLogged && match[2] !== loginData.value._id) {
      console.log(`----> can not edit other users profiles: ${loginData.value._id} -- ${match[2]}`)
      router.replace({ name: 'Users' })
    }
    console.log(`----> watched URL: ${req.url} TOKEN: ${loggedToken} LoggedIn: ${isLogged} UserId: ${loginData.value._id}`)
    console.log(`>> Request UPDATED: ${req.method} ${req.url} ${JSON.stringify(req.headers.common)}`)
    return req
  })
}

function resInterceptor () {
  axios.interceptors.response.use(res => {
    console.log(`>> Response: ${res.status} ${JSON.stringify(res.headers)}`)
    if (res.status === 401) {
      console.log('!!! Unauthorised access detected. Perform redirect')
      router.push({ name: 'Login' })
    }
    return res
  })
}

export {
  resetHeaders,
  reqInterceptor,
  resInterceptor
}
