import UserInterface from '@/modules/types/IUser'
import { server } from '@/backend-server'
import axios, { AxiosResponse } from 'axios'
import { TokenInterface, tokenService } from '@/modules/services/token-service'
import LoginInterface from '@/modules/types/ILogin'
import router from '@/router'

const token = tokenService.getAccessToken()
// const privateEndpoints = ['edit']

// TODO: move to separate module
// get list of userIds in DB
// check urls against the existing id list <-- private pages
axios.interceptors.request.use(req => {
  console.log(`>> Request: ${req.method} ${req.url} ${JSON.stringify(req.headers)}`)
  req.headers.Authorization = `Bearer ${token}`
  if (!tokenService.isLoggedIn()) {
    // {name: 'Edit', params: {id: user._id}}
    console.log(`>>>>>>>>>> not logged in at URL: ${req.url}`)
  }
  if (req.url === 'http://localhost:3000/users/5f640595fc86ad6952e2a47f') {
    if (!tokenService.isLoggedIn()) {
      console.log('----> redirecting')
      router.push({ name: 'Login' })
    }
  }
  console.log(`-> at URL: ${req.url} TOKEN: ${token} LoggedIn: ${tokenService.isLoggedIn()}`)
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

async function postUserLogin (loginData: LoginInterface): Promise<object> {
  try {
    const response: AxiosResponse<TokenInterface> = await axios.post(`${server.baseURL}/users/auth/login`, loginData)
    // eslint-disable-next-line @typescript-eslint/camelcase
    tokenService.login({ access_token: response.data.access_token, email: loginData.email })
    return response.data
  } catch (err) {
    return { statusCode: 401, message: 'Unauthorized' }
  }
}

function doUserLogout (): object {
  try {
    tokenService.logout()
    return { statusCode: 200, message: 'Successfully logged out' }
  } catch (err) {
    return { statusCode: 400, message: 'Error in log out' }
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
  doUserLogout
}
