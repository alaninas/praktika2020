import UserInterface from '@/modules/types/IUser'
import { arePassworsEqual } from '@/modules/utilities/userErrorLogic'
import { userErrors } from '@/modules/states/userErrors'

export function getUserErrors () {
  return userErrors
}

export async function setUserErrors (userInp: UserInterface) {
  const pswdMessagge = await arePassworsEqual(userInp) ? '' : 'Passwords do not match.'
  userErrors.value = Object.assign({}, userErrors.value, {
    password: pswdMessagge,
    passwordConfirm: pswdMessagge
  })
  return userErrors.value
}

export function clearUserErrors () {
  userErrors.value = { password: '', passwordConfirm: '' }
}
