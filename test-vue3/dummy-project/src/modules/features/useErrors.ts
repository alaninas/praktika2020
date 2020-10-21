import UserInterface from '@/modules/types/IUser'
import { ref } from 'vue'
import { arePassworsEqual, isNameUnique } from '@/modules/utilities/userFieldLogic'

export const validationErrors = ref({})

export const userErrors = ref({ name: '', password: '' })

export function resetErrors () {
  validationErrors.value = {}
  userErrors.value = { name: '', password: '' }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function clearAddressValidationError (valErr: any) {
  validationErrors.value = Object.assign({}, valErr, {
    address: ''
  })
}

export function assignUserErrors (user: UserInterface) {
  userErrors.value = Object.assign({}, userErrors.value, {
    userName: (isNameUnique(user) ? '' : 'User name is not unique.'),
    password: (arePassworsEqual(user) ? '' : 'Passwords do not match.')
  })
  return userErrors.value
}
