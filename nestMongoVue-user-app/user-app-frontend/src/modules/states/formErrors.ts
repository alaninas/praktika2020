import { ref } from 'vue'
import UserInterface from '@/modules/types/IUser'

const validationErrors = ref({})

const userErrors = ref({ password: '', passwordConfirm: '' })

function setUserErrors (user: UserInterface) {
  const pswdMessagge = user.password === user.passwordConfirm ? '' : 'Passwords do not match.'
  userErrors.value = Object.assign({}, userErrors.value, {
    password: pswdMessagge,
    passwordConfirm: pswdMessagge
  })
  return userErrors.value
}

function resetValidationErrors () {
  validationErrors.value = {}
}

function resetUserErrors () {
  userErrors.value = { password: '', passwordConfirm: '' }
}

function resetFormErrors () {
  resetValidationErrors()
  resetUserErrors()
}

export {
  userErrors,
  validationErrors,
  setUserErrors,
  resetFormErrors,
  resetValidationErrors
}
