import { ref } from 'vue'
import UserInterface from '@/modules/types/IUser'

const validationErrors = ref({})

const userErrors = ref({ password: '', passwordConfirm: '' })

const httpErrorMessage = ref({ userLogin: '', pswdReset: '' })

function setUserErrors (user: UserInterface) {
  const pswdMessagge = user.password === user.passwordConfirm ? '' : 'Passwords do not match.'
  userErrors.value = Object.assign({}, userErrors.value, {
    password: pswdMessagge,
    passwordConfirm: pswdMessagge
  })
  return userErrors.value
}

function resetHttpErrorMessage () {
  httpErrorMessage.value = { userLogin: '', pswdReset: '' }
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
  resetHttpErrorMessage()
}

export {
  userErrors,
  validationErrors,
  httpErrorMessage,
  setUserErrors,
  resetFormErrors,
  resetValidationErrors,
  resetHttpErrorMessage
}
