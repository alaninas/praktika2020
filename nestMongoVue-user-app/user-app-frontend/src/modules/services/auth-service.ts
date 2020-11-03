import { server } from '@/backend-server'
import axios, { AxiosResponse } from 'axios'
import LoginInterface from '@/modules/types/ILogin'

function login (data: JSON) {
  localStorage.setItem('accessToken', JSON.stringify(data))
}

function logout () {
  localStorage.removeItem('accessToken')
}

async function postUserLogin (loginData: LoginInterface) {
  try {
    const response: AxiosResponse<JSON> = await axios.post(`${server.baseURL}/users/auth/login`, loginData)
    login(response.data)
    return response
  } catch (err) {
    // unauthorised
    // direct to login
  }
}

export {
  postUserLogin,
  logout,
  login
}
