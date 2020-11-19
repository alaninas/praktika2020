import { server } from '@/backend-server'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { LoginInterface } from '@/modules/types/ILogin'
import UserInterface from '@/modules/types/IUser'
import { tokenService } from './token-service'
import { resetHeaders, reqInterceptor, resInterceptor } from './headers-service'
import { to } from '@/modules/utilities/index-utility'

resetHeaders()
reqInterceptor()
resInterceptor()

async function getUserImageString (userId: string, image: string): Promise<AxiosResponse<Blob>> {
  return await axios.get(`${server.baseURL}/users/uploads/${userId}/${image}`)
}

async function deleteUserImage (id: string, image: string): Promise<AxiosResponse<string[]>> {
  return await axios.delete(`${server.baseURL}/users/gallery/${id}/${image}`)
}

async function putUserNewImages ({ formData, id, config }: { formData: FormData; id: string; config: AxiosRequestConfig }): Promise<AxiosResponse<UserInterface>> {
  const [error, result] = await to(axios.put(`${server.baseURL}/users/uploads/${id}`, formData, config))
  if (error) throw error
  return result
}

async function postUserLogin (loginData: LoginInterface): Promise<object> {
  const [error, result] = await to(axios.post(`${server.baseURL}/users/auth/login`, loginData))
  if (error) throw error.message
  tokenService.login(result.data)
  return result.data
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
  const [error, result] = await to(axios.get(`${server.baseURL}/users/email/${email}`))
  if (error) throw error.message
  return result
}

async function postNewUser (newUser: UserInterface): Promise<AxiosResponse<UserInterface>> {
  return await axios.post(`${server.baseURL}/users`, newUser)
}

async function putUpdatedUser (newUser: UserInterface): Promise<AxiosResponse<UserInterface>> {
  return await axios.put(`${server.baseURL}/users`, newUser)
}

async function putTemporaryPassword (email: string, pass: string): Promise<AxiosResponse<[UserInterface, string]>> {
  const [error, result] = await to(axios.put(`${server.baseURL}/users/email/${email}`, { sub: pass }))
  if (error) throw error.message
  return result
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
  getOneUserByEmail,
  putTemporaryPassword,
  // getUserImages,
  deleteUserImage,
  getUserImageString,
  putUserNewImages
}
