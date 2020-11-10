import UserInterface from '@/modules/types/IUser'
import { userErrors, validationErrors, httpErrors } from '@/modules/types/IErors'
import { LoginInterface } from '../types/ILogin'
import { Ref } from 'vue'

function setUserErrors (user: UserInterface) {
  const pswdMessagge = user.password === user.passwordConfirm ? '' : 'Passwords do not match.'
  userErrors.value = Object.assign({}, userErrors.value, {
    password: pswdMessagge,
    passwordConfirm: pswdMessagge
  })
  return userErrors.value
}

function setHttpErrorEmail ({ message = '' }: { message?: string }) {
  httpErrors.value.email = message
}

function setHttpErrorPswd ({ message = '' }: { message?: string }) {
  httpErrors.value.password = message
}

function setHttpErrors (loginData: Ref<LoginInterface>) {
  if (loginData.value.email === '') setHttpErrorEmail({})
  if (loginData.value.password === '') setHttpErrorPswd({})
}

function resetHttpErrors () {
  setHttpErrorEmail({})
  setHttpErrorPswd({})
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
  resetHttpErrors()
}

export {
  userErrors,
  validationErrors,
  httpErrors,
  setUserErrors,
  setHttpErrors,
  resetFormErrors,
  resetValidationErrors,
  resetHttpErrors,
  setHttpErrorPswd,
  setHttpErrorEmail
}
