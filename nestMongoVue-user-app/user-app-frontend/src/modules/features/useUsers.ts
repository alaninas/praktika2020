import UserInterface from '@/modules/types/IUser'
import { Ref } from 'vue'
import { addUsersStateUser, getState, loadSortedUsers, loadUnsortedUsers, removeUsersStateUser, updateUsersStateUser } from '@/modules/states/users'
import { getDirection } from '@/modules/utilities/users-utility'

export async function useUsers () {
  function searchByEmail ({ pattern = '' }: { pattern?: string }): UserInterface[] {
    const re = new RegExp(pattern, 'i')
    const myUsers = getState()
    return pattern ? myUsers.value.filter(el => el.email && re.test(el.email)) : []
  }

  async function unsorted (): Promise<Ref<UserInterface[]>> {
    return await loadUnsortedUsers()
  }

  async function sortByWebsite (reverse: boolean): Promise<Ref<UserInterface[]>> {
    return await loadSortedUsers('website', getDirection(reverse))
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
    return await addUsersStateUser(newUser)
  }

  async function removeUser (userId: string): Promise<Ref<UserInterface[]>> {
    return await removeUsersStateUser(userId)
  }

  async function editUser (newUser: UserInterface): Promise<Ref<UserInterface[]>> {
    return await updateUsersStateUser(newUser)
  }
  return { unsorted, sortByEmail, sortByAge, sortByAddress, sortByFullname, sortByPassword, sortById, searchByEmail, removeUser, addUser, sortByCountry, editUser, sortByWebsite }
}
