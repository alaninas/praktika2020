import UserInterface from '@/modules/types/IUser'
import { server } from '@/backend-server'
import axios, { AxiosResponse } from 'axios'
import { reqInterceptor, resInterceptor } from '@/modules/services/index'

// axios.interceptors.request.use(req => {
//   console.log(`Request: ${req.method} ${req.url} ${JSON.stringify(req.headers)}`)
//   // Important: request interceptors **must** return the request.
//   // patikrini ar yra tokenas, jei ne redirectini i login
//   // jei yra pridedi prie requesto headeriu
//   // sąrašas puslapių ant kurių reikia daryt redirect
//   // tikrinam req.url, ar jis nepriklauso šitam sąrašui
//   // dedam headerius ir redirectinam tik jei priklauso šitam sąrašui
//   // routerio logikos galime netaikyti: būtų aktualu jei turėtume dauigau rolių
//   return req
// })
// axios.interceptors.response.use(res => {
//   console.log(`Response: ${res.status} ${JSON.stringify(res.headers)}`)
//   // Important: response interceptors **must** return the response.
//   // ant 401 redirectink i logina
//   // priklausyma public puslapiu sarasui galime netikrinti
//   return res
// })

axios.interceptors.request.use(reqInterceptor)
axios.interceptors.response.use(resInterceptor)

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
  putUpdatedUser
}
