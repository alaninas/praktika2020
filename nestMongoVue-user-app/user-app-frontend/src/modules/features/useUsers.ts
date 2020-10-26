import UserInterface from '@/modules/types/IUser'
import { compareNumbers, compareStrings } from '@/modules/utilities/compareFunctions'
import { ref, Ref } from 'vue'
import { server } from '@/backend-server'
import axios, { AxiosResponse } from 'axios'

// let usersBE: UserInterface[]
async function getBEusers (): Promise<Ref<AxiosResponse<UserInterface[]>>> {
  const c: Ref<AxiosResponse<UserInterface[]>> = ref(await axios.get(`${server.baseURL}/users`))
  // const d = c.value.data
  return c
}

export default async function useUsers () {
  const usersBE = await getBEusers()
  // usersBE.value.data.sort((a, b) => compareStrings(a.password, b.password, false))
  // await usersBE.value.data.sort((a, b) => compareNumbers(a.age, b.age, false))
  // const usersBE = usersB.sort((a, b) => compareStrings(a._id, b._id, false))
  return { usersBE }
}

export async function useUsersFunc () {
  const users = await getBEusers()

  function searchByEmail ({ pattern = '' }: { pattern?: string }): UserInterface[] {
    const re = new RegExp(pattern, 'i')
    return pattern ? users.value.data.filter(el => el.email && re.test(el.email)) : []
  }

  function sortByUserId (reverse: boolean): UserInterface[] {
    return users.value.data.sort((a, b) => compareStrings(a._id, b._id, reverse))
  }

  function sortByFullName (reverse: boolean): UserInterface[] {
    return users.value.data.sort((a, b) => compareStrings(a.fullName, b.fullName, reverse))
  }

  function sortByEmail (reverse: boolean): UserInterface[] {
    return users.value.data.sort((a, b) => compareStrings(a.email, b.email, reverse))
  }

  function sortByCountry (reverse: boolean): UserInterface[] {
    return users.value.data.sort((a, b) => compareStrings(a.country, b.country, reverse))
  }

  function sortByAddressString (reverse: boolean): UserInterface[] {
    return users.value.data.sort((a, b) => compareStrings(a.address, b.address, reverse))
  }

  function sortByPswd (reverse: boolean): UserInterface[] {
    return users.value.data.sort((a, b) => compareStrings(a.password, b.password, reverse))
  }

  function sortByName (reverse: boolean): UserInterface[] {
    return users.value.data.sort((a, b) => compareStrings(a.name, b.name, reverse))
  }

  function sortByAge (reverse: boolean): UserInterface[] {
    return users.value.data.sort((a, b) => compareNumbers(a.age, b.age, reverse))
  }
  return { users, searchByEmail, sortByPswd, sortByName, sortByUserId, sortByAge, sortByEmail, sortByAddressString, sortByCountry, sortByFullName }
}
