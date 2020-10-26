import UserInterface from '@/modules/types/IUser'
import { ref } from 'vue'
import { arePassworsEqual, isNameUnique } from '@/modules/utilities/userErrorLogic'

export const userErrors = ref({ userName: '', password: '' })

export async function setUserErrors (userInp: UserInterface) {
  // console.log('inside error update')
  // console.log(userInp)
  const nameMessage = await isNameUnique(userInp) ? '' : 'User name is not unique.'
  const pswdMessagge = await arePassworsEqual(userInp) ? '' : 'Passwords do not match.'
  userErrors.value = Object.assign({}, userErrors.value, {
    name: nameMessage,
    password: pswdMessagge,
    passwordConfirm: pswdMessagge
  })
  return userErrors.value
}

export function clearUserErrors () {
  userErrors.value = { userName: '', password: '' }
}
