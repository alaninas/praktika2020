import User from '@/modules/User'
import { users } from '@/modules/users'
// import { errors, getErrors } from '@/modules/errors'
import { compareNumbers, compareStrings } from '@/modules/compareFunctions'
import { ref } from 'vue'

const uErrors = ref({ name: '' })

export default function useUsers () {
  function isNameUnique (user: User): boolean {
    if (user.name === undefined || user.name.length === 0) return true
    return user.name.length > 0 && users.value.findIndex(el => el.name === user.name) < 0
  }

  function arePassworsEqual (user: User): boolean {
    // if (user.password === undefined && user.passwordConfirm === undefined) return true
    return user.password === user.passwordConfirm
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function usersAdd (user: User) {
    // users.value.push(user)
    return users.value
  }

  function usersRemove (user: User): User[] {
    const index = users.value.findIndex(el => el.name === user.name)
    if (index > -1) users.value.splice(index, 1)
    return users.value
  }

  function usersSearchByName ({ pattern = '' }: { pattern?: string }): User[] {
    const re = new RegExp(pattern, 'i')
    return pattern ? users.value.filter(el => el.name && re.test(el.name)) : []
  }

  function usersSortByName (reverse: boolean): User[] {
    return users.value.sort((a, b) => compareStrings(a.name, b.name, reverse))
  }

  function usersSortByEmail (reverse: boolean): User[] {
    return users.value.sort((a, b) => compareStrings(a.email, b.email, reverse))
  }

  function usersSortByAge (reverse: boolean): User[] {
    return users.value.sort((a, b) => compareNumbers(a.age, b.age, reverse))
  }

  return { users, uErrors, isNameUnique, usersAdd, usersRemove, usersSearchByName, usersSortByName, usersSortByAge, usersSortByEmail, arePassworsEqual }
}
