import UserInterface from '@/modules/types/IUser'
import { server } from '@/backend-server'
import axios, { AxiosResponse } from 'axios'
import { TokenInterface, tokenService } from '@/modules/services/token-service'
import LoginInterface from '@/modules/types/ILogin'

const token = tokenService.getAccessToken()
const privateEndpoints = ['edit']

axios.interceptors.request.use(req => {
  console.log(`>> Request: ${req.method} ${req.url} ${JSON.stringify(req.headers)}`)
  if (!tokenService.isLoggedIn()) {
    // {name: 'Edit', params: {id: user._id}}
    console.log(`>>>>>>>>>> not logged in at URL: ${req.url}`)
  }
  console.log(`-> at URL: ${req.url} TOKEN: ${token}`)
  req.headers.Authorization = `Bearer ${token}`
  return req
})

async function postUserLogin (loginData: LoginInterface): Promise<object> {
  try {
    const response: AxiosResponse<TokenInterface> = await axios.post(`${server.baseURL}/users/auth/login`, loginData)
    tokenService.login(response.data)
    return response.data
  } catch (err) {
    return { statusCode: 401, message: 'Unauthorized' }
  }
}

async function doUserLogout (): Promise<object> {
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
