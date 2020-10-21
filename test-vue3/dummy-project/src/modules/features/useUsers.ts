import UserInterface from '@/modules/types/IUser'
import { compareNumbers, compareStrings } from '@/modules/utilities/compareFunctions'
import { ref, Ref } from 'vue'

export const users: Ref<UserInterface[]> = ref([
  { userName: 'a', age: 22, email: 'hhgh@gmail.com' } as UserInterface,
  { userName: 'ca', age: 33, email: 'a@gmail.com' } as UserInterface,
  { userName: 'AA', age: 44, email: 'AA@gmail.com' } as UserInterface
])

export default function useUsers () {
  function usersRemove (user: UserInterface): UserInterface[] {
    const index = users.value.findIndex(el => el.userName === user.userName)
    if (index > -1) users.value.splice(index, 1)
    return users.value
  }

  function usersSearchByName ({ pattern = '' }: { pattern?: string }): UserInterface[] {
    const re = new RegExp(pattern, 'i')
    return pattern ? users.value.filter(el => el.userName && re.test(el.userName)) : []
  }

  function usersSortByName (reverse: boolean): UserInterface[] {
    return users.value.sort((a, b) => compareStrings(a.userName, b.userName, reverse))
  }

  function usersSortByEmail (reverse: boolean): UserInterface[] {
    return users.value.sort((a, b) => compareStrings(a.email, b.email, reverse))
  }

  function usersSortByAge (reverse: boolean): UserInterface[] {
    return users.value.sort((a, b) => compareNumbers(a.age, b.age, reverse))
  }
  return { users, usersRemove, usersSearchByName, usersSortByName, usersSortByAge, usersSortByEmail }
}
