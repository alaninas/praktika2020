import UserInterface from '@/modules/types/IUser'
import { userErrors, validationErrors, httpErrors, HttpErrorsFieldTypes } from '@/modules/types/IErors'
import { LoginInterface } from '../types/ILogin'
import { Ref, watch } from 'vue'

function setUserErrorsPassword (user: UserInterface) {
  const pswdMessagge = user.password === user.passwordConfirm ? '' : 'Passwords do not match.'
  userErrors.value = Object.assign({}, userErrors.value, {
    password: pswdMessagge,
    passwordConfirm: pswdMessagge
  })
  return userErrors.value
}

function setHttpErrorsField ({ field, message = '' }: { field: HttpErrorsFieldTypes; message?: string }) {
  httpErrors.value[field] = message
}

function clearHttpErrorsLogin (loginData: Ref<LoginInterface>) {
  if (loginData.value.email === '') setHttpErrorsField({ field: 'email' })
  if (loginData.value.password === '') setHttpErrorsField({ field: 'password' })
}

function resetHttpErrors () {
  httpErrors.value = { email: '', password: '' }
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

watch(httpErrors, (httpErrors) => {
  console.log('------- from httpErrors watcher')
  console.log(httpErrors)
})

export {
  userErrors,
  validationErrors,
  httpErrors,
  setUserErrorsPassword,
  clearHttpErrorsLogin,
  resetFormErrors,
  resetValidationErrors,
  resetHttpErrors,
  setHttpErrorsField
  // setUserErrorsField
}
