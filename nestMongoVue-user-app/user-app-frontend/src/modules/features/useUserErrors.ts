import UserInterface from '@/modules/types/IUser'
import { ref } from 'vue'
import { arePassworsEqual, isEmailUnique } from '@/modules/utilities/userErrorLogic'

export const userErrors = ref({ email: '', password: '' })

export async function setUserErrors (userInp: UserInterface) {
  // console.log('inside error update')
  // console.log(userInp)
  const nameMessage = await isEmailUnique(userInp) ? '' : 'Email is not unique.'
  const pswdMessagge = await arePassworsEqual(userInp) ? '' : 'Passwords do not match.'
  userErrors.value = Object.assign({}, userErrors.value, {
    email: nameMessage,
    password: pswdMessagge,
    passwordConfirm: pswdMessagge
  })
  return userErrors.value
}

export function clearUserErrors () {
  userErrors.value = { email: '', password: '' }
}
