import UserInterface from '@/modules/types/IUser'
import { users } from '@/modules/types/users'
import { userErrors } from '@/modules/types/errors'

function isNameUnique (user: UserInterface): boolean {
  if (user.name === undefined || user.name.length === 0) return true
  return user.name.length > 0 && users.value.findIndex(el => el.name === user.name) < 0
}

function arePassworsEqual (user: UserInterface): boolean {
  return user.password === user.passwordConfirm
}

export function assignUserErrors (user: UserInterface) {
  userErrors.value = Object.assign({}, userErrors.value, {
    name: (isNameUnique(user) ? '' : 'User name is not unique.'),
    password: (arePassworsEqual(user) ? '' : 'Passwords do not match.')
  })
  return userErrors.value
}
