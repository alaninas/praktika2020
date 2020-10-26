import UserInterface from '@/modules/types/IUser'
import { ref } from 'vue'
import { arePassworsEqual, isNameUnique } from '@/modules/utilities/userFieldLogic'

export const validationErrors = ref({})

export const userErrors = ref({ userName: '', password: '' })

export function resetErrors () {
  validationErrors.value = {}
  userErrors.value = { userName: '', password: '' }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function clearAddressValidationError (valErr: any) {
  validationErrors.value = Object.assign({}, valErr, {
    address: ''
  })
}

export async function assignUserErrors (user: UserInterface) {
  const nameMessage = await isNameUnique(user) ? '' : 'User name is not unique.'
  const pswdMessagge = await arePassworsEqual(user) ? '' : 'Passwords do not match.'
  userErrors.value = Object.assign({}, userErrors.value, {
    name: nameMessage,
    password: pswdMessagge,
    passwordConfirm: pswdMessagge
  })
  return userErrors.value
}
