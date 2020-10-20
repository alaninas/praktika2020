import UserInterface from '@/modules/types/IUser'
import { users } from '@/modules/types/users'
import { compareNumbers, compareStrings } from '@/modules/utilities/compareFunctions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function usersAdd (user: UserInterface) {
  // users.value.push(user)
  return users.value
}

export default function useUsers () {
  function usersRemove (user: UserInterface): UserInterface[] {
    const index = users.value.findIndex(el => el.name === user.name)
    if (index > -1) users.value.splice(index, 1)
    return users.value
  }

  function usersSearchByName ({ pattern = '' }: { pattern?: string }): UserInterface[] {
    const re = new RegExp(pattern, 'i')
    return pattern ? users.value.filter(el => el.name && re.test(el.name)) : []
  }

  function usersSortByName (reverse: boolean): UserInterface[] {
    return users.value.sort((a, b) => compareStrings(a.name, b.name, reverse))
  }

  function usersSortByEmail (reverse: boolean): UserInterface[] {
    return users.value.sort((a, b) => compareStrings(a.email, b.email, reverse))
  }

  function usersSortByAge (reverse: boolean): UserInterface[] {
    return users.value.sort((a, b) => compareNumbers(a.age, b.age, reverse))
  }
  return { users, usersAdd, usersRemove, usersSearchByName, usersSortByName, usersSortByAge, usersSortByEmail }
}
