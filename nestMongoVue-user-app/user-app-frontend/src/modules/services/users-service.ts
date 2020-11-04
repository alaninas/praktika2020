import UserInterface from '@/modules/types/IUser'
import { server } from '@/backend-server'
import axios, { AxiosResponse } from 'axios'
import { TokenInterface, tokenService } from '@/modules/services/token-service'
import LoginInterface from '@/modules/types/ILogin'
import router from '@/router'
// import { useLogin } from '@/modules/features/useLogin'
import { getLog, getToken, loginData, loadState, loginStateUser, logoutStateUser } from '@/modules/states/login'
import { user } from '../states/user'

const token = null
// axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null
axios.defaults.headers.common.Authorization = null
const editFormUrl = /(http:\/\/localhost:3000\/users\/)([^/]{24})/

axios.interceptors.request.use(req => {
  const loggedToken = getToken().value
  const isLogged = getLog().value
  console.log(`>> Request: ${req.method} ${req.url} ${JSON.stringify(req.headers.common)}`)
  // req.headers.Authorization = `Bearer ${token}`
  // req.headers.common = { Authorization: `Bearer ${token}` }
  // req.headers.common.Authorization = 'TEST222'
  req.headers.common.Authorization = (loggedToken || token) ? `Bearer ${loggedToken || token}` : null
  if (!tokenService.isLoggedIn()) {
    // {name: 'Edit', params: {id: user._id}}
    console.log(`>>>>>>>>>> not logged in at URL: ${req.url}`)
  }
  const match = req.url?.match(editFormUrl)
  if (match && !isLogged) {
    console.log('----> redirecting')
    router.push({ name: 'Login' })
  }
  if (match && isLogged && match[2] !== loginData.value._id) {
    console.log(`----> can not display other users profiles: ${loginData.value._id} -- ${match[2]}`)
    router.replace({ name: 'Users' })
  }
  // 'http://localhost:3000/users' + getId() -> authorised if loggedIn
  //                               + some-other-24bit-hexadecimal -> is not authorised
  //                               + all-other-cases-not-supervised
  // (http:\/\/localhost:3000\/users\/)([^/]{24})
  // if (req.url === 'http://localhost:3000/users/5f640595fc86ad6952e2a47f') {
  //   if (!tokenService.isLoggedIn()) {
  //     console.log('----> redirecting')
  //     router.push({ name: 'Login' })
  //   }
  // }
  console.log(`----> at URL: ${req.url} TOKEN: ${token} LoggedIn: ${token}`)
  console.log(`----> watched URL: ${req.url} TOKEN: ${loggedToken} LoggedIn: ${isLogged} UserId: ${loginData.value._id}`)
  console.log(`>> Request UPDATED: ${req.method} ${req.url} ${JSON.stringify(req.headers.common)}`)
  // req.headers.Authorization = `Bearer ${token}`
  return req
})

axios.interceptors.response.use(res => {
  console.log(`>> Response: ${res.status} ${JSON.stringify(res.headers)}`)
  if (res.status === 401) {
    console.log('!!! Unauthorised access detected. Perform redirect')
    router.push({ name: 'Login' })
  }
  return res
})

function revokeUserLogin (): object {
  try {
    tokenService.logout()
    axios.defaults.headers.common.Authorization = null
    return { statusCode: 200, message: 'Successfully logged out' }
  } catch (err) {
    return { statusCode: 400, message: 'Error in log out' }
  }
}

async function postUserLogin (loginData: LoginInterface): Promise<object> {
  try {
    const response: AxiosResponse<TokenInterface> = await axios.post(`${server.baseURL}/users/auth/login`, loginData)
    // eslint-disable-next-line @typescript-eslint/camelcase
    // tokenService.login({ access_token: response.data.access_token, email: loginData.email, id: loginData._id || '' })
    tokenService.login(response.data)
    return response.data
  } catch (err) {
    return { statusCode: 401, message: 'Unauthorized' }
  }
}

async function getAllUsers (): Promise<AxiosResponse<UserInterface[]>> {
  return await axios.get(`${server.baseURL}/users`)
}

async function getAllUsersSorted ({ column, direction }: { column: string; direction: string }): Promise<AxiosResponse<UserInterface[]>> {
  return await axios.get(`${server.baseURL}/users/sort/${column}/${direction}`)
}

async function getOneUser (userId: string): Promise<AxiosResponse<UserInterface>> {
  return await axios.get(`${server.baseURL}/users/${userId}`)
}

async function getOneUserByEmail (email: string): Promise<AxiosResponse<UserInterface>> {
  return await axios.get(`${server.baseURL}/users/email/${email}`)
}

async function postNewUser (newUser: UserInterface): Promise<AxiosResponse<UserInterface>> {
  return await axios.post(`${server.baseURL}/users`, newUser)
}

async function putUpdatedUser (newUser: UserInterface): Promise<AxiosResponse<UserInterface>> {
  return await axios.put(`${server.baseURL}/users`, newUser)
}

async function deleteUser (userId: string): Promise<AxiosResponse<UserInterface>> {
  return await axios.delete(`${server.baseURL}/users/${userId}`)
}

export {
  getAllUsers,
  getAllUsersSorted,
  postNewUser,
  deleteUser,
  getOneUser,
  putUpdatedUser,
  postUserLogin,
  revokeUserLogin,
  getOneUserByEmail
}
