import UserInterface from '@/modules/types/IUser'
import { server } from '@/backend-server'
import axios, { AxiosResponse } from 'axios'

async function getAllUsers (): Promise<AxiosResponse<UserInterface[]>> {
  console.log('state calls unsorted users')
  return await axios.get(`${server.baseURL}/users`)
}

async function getAllUsersSorted ({ column, direction }: { column: string; direction: string }): Promise<AxiosResponse<UserInterface[]>> {
  console.log(`state calls sorted users by column: ${column} in order: ${direction}`)
  return await axios.get(`${server.baseURL}/users/sort/${column}/${direction}`)
}

async function postNewUser (newUser: UserInterface): Promise<AxiosResponse<UserInterface>> {
  console.log(`state calls createNewUser email: ${newUser.email}`)
  return await axios.post(`${server.baseURL}/users`, newUser)
}

async function deleteUser (userId: string): Promise<AxiosResponse<UserInterface>> {
  console.log(`state calls deleteUser id: ${userId}`)
  return await axios.delete(`${server.baseURL}/users/${userId}`)
}

export {
  getAllUsers,
  getAllUsersSorted,
  postNewUser,
  deleteUser
}
