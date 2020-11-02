import UserInterface from '@/modules/types/IUser'
import { Ref } from 'vue'
import { addStateUser, getState, loadSortedUsers, loadUnsortedUsers, removeStateUser, getStateUser, updateStateUser } from '@/modules/states/users'

export async function useUsers () {
  function searchByEmail ({ pattern = '' }: { pattern?: string }): UserInterface[] {
    const re = new RegExp(pattern, 'i')
    const myUsers = getState()
    return pattern ? myUsers.value.filter(el => el.email && re.test(el.email)) : []
  }

  function getDirection (reverse: boolean): 'dsc' | 'asc' {
    const direction = reverse ? 'dsc' : 'asc'
    return direction
  }

  async function unsorted (): Promise<Ref<UserInterface[]>> {
    return await loadUnsortedUsers()
  }

  async function sortByEmail (reverse: boolean): Promise<Ref<UserInterface[]>> {
    return await loadSortedUsers('email', getDirection(reverse))
  }

  async function sortByAge (reverse: boolean): Promise<Ref<UserInterface[]>> {
    return await loadSortedUsers('age', getDirection(reverse))
  }

  async function sortByAddress (reverse: boolean): Promise<Ref<UserInterface[]>> {
    return await loadSortedUsers('address', getDirection(reverse))
  }

  async function sortByFullname (reverse: boolean): Promise<Ref<UserInterface[]>> {
    return await loadSortedUsers('fullname', getDirection(reverse))
  }

  async function sortByPassword (reverse: boolean): Promise<Ref<UserInterface[]>> {
    return await loadSortedUsers('password', getDirection(reverse))
  }

  async function sortById (reverse: boolean): Promise<Ref<UserInterface[]>> {
    return await loadSortedUsers('id', getDirection(reverse))
  }

  async function sortByCountry (reverse: boolean): Promise<Ref<UserInterface[]>> {
    return await loadSortedUsers('country', getDirection(reverse))
  }

  async function addUser (newUser: UserInterface): Promise<Ref<UserInterface[]>> {
    return await addStateUser(newUser)
  }

  async function removeUser (userId: string): Promise<Ref<UserInterface[]>> {
    return await removeStateUser(userId)
  }

  // async function getUserById (userId: string | string[]): Promise<UserInterface> {
  //   // const c: string = userId[0].toString() || userId.toString()
  //   // // if (userId[0]) c = userId[0].toString()
  //   if (!userId) return {} as UserInterface
  //   return await getStateUser(userId.toString())
  // }

  async function editUser (newUser: UserInterface): Promise<Ref<UserInterface[]>> {
    return await updateStateUser(newUser)
  }
  return { unsorted, sortByEmail, sortByAge, sortByAddress, sortByFullname, sortByPassword, sortById, searchByEmail, removeUser, addUser, sortByCountry, editUser }
}
