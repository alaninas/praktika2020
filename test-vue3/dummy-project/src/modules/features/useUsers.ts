import UserInterface from '@/modules/types/IUser'
import { users } from '@/modules/types/users'
// import { errors, getErrors } from '@/modules/errors'
import { compareNumbers, compareStrings } from '@/modules/utilities/compareFunctions'
import { ref } from 'vue'

const uErrors = ref({ name: '' })

export default function useUsers () {
  function isNameUnique (user: UserInterface): boolean {
    if (user.name === undefined || user.name.length === 0) return true
    return user.name.length > 0 && users.value.findIndex(el => el.name === user.name) < 0
  }

  function arePassworsEqual (user: UserInterface): boolean {
    return user.password === user.passwordConfirm
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function usersAdd (user: UserInterface) {
    // users.value.push(user)
    return users.value
  }

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

  return { users, uErrors, isNameUnique, usersAdd, usersRemove, usersSearchByName, usersSortByName, usersSortByAge, usersSortByEmail, arePassworsEqual }
}
