import UserInterface from '@/modules/types/IUser'
import { users } from '@/modules/features/useUsers'
import { ref } from 'vue'

function isNameUnique (user: UserInterface): boolean {
  if (user.name === undefined || user.name.length === 0) return true
  return user.name.length > 0 && users.value.findIndex(el => el.name === user.name) < 0
}

function arePassworsEqual (user: UserInterface): boolean {
  return user.password === user.passwordConfirm
}

export const validationErrors = ref({})

export const userErrors = ref({ name: '', password: '' })

export function resetErrors () {
  validationErrors.value = {}
  userErrors.value = { name: '', password: '' }
}

export function assignUserErrors (user: UserInterface) {
  userErrors.value = Object.assign({}, userErrors.value, {
    name: (isNameUnique(user) ? '' : 'User name is not unique.'),
    password: (arePassworsEqual(user) ? '' : 'Passwords do not match.')
  })
  return userErrors.value
}
