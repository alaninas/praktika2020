import User from '@/modules/User'
import { users } from '@/modules/users'
import { compareNumbers, compareStrings } from '@/modules/compareFunctions'

export default function useUsers () {
  function isNameUnique (user: User): boolean {
    return user.name !== undefined && users.value.findIndex(el => el.name === user.name) < 0
  }

  // perform inner validation on userNameUniqueness &&
  // pswd1 === pswd2
  // --> update errorObject
  // ---> onSubmit will set the appropriate error messaging on invalid fields
  // if (!isNameUnique(nu)) nu.getUserValidate().setErrors({ isValid: false, messages: ['User name is not unique.'] })
  // if (nu.getUserValidate().isValid) usersAdd(nu)
  function usersAdd (user: User): User[] {
    users.value.push(user)
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

  return { users, isNameUnique, usersAdd, usersRemove, usersSearchByName, usersSortByName, usersSortByAge, usersSortByEmail }
}
