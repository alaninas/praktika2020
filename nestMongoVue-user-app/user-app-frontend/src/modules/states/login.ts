import { LoginInterface, authCredentials, AuthCredentialsType, loginData } from '@/modules/types/ILogin'
import { Ref, watchEffect } from 'vue'
import { resetHttpErrors, resetValidationErrors, clearHttpErrorsLogin, setHttpErrorsField } from '@/modules/states/formErrors'
import { tokenService } from '@/modules/services/token-service'
import { resetUserPassword, loginUser } from '@/modules/utilities/login-utility'
import { to } from '@/modules/utilities/index-utility'

function setState ({ data = { password: '', email: '', _id: '' } }: {data?: LoginInterface}): Ref<LoginInterface> {
  loginData.value = data
  authCredentials.value = tokenService.getAuthCredentials()
  clearHttpErrorsLogin(loginData)
  return loginData
}

function getAuthCredentials (): AuthCredentialsType {
  return authCredentials.value
}

function clearLoginState () {
  resetValidationErrors()
  resetHttpErrors()
  setState({})
}

function performLogout () {
  tokenService.logout()
  clearLoginState()
}

function loadLoginData (data: LoginInterface, noDataReload: boolean): Ref<LoginInterface> {
  if (!noDataReload) {
    performLogout()
    setState({ data })
  }
  return loginData
}

async function loginStateUser (userLogin: LoginInterface) {
  const [error, result] = await to(loginUser(userLogin))
  if (error) {
    setHttpErrorsField({ field: 'email', message: `Please check user ${userLogin.email} credentials` })
    setHttpErrorsField({ field: 'password', message: 'Please check your password' })
  }
  if (result) {
    resetHttpErrors()
    setState({ data: result })
  }
}

async function resetStatePassword (userLogin: LoginInterface, isPassowrdForgotten: boolean): Promise<boolean> {
  userLogin.password = ''
  const [error, result] = await to(resetUserPassword(userLogin))
  if (error) setHttpErrorsField({ field: 'email', message: error.message })
  if (result) {
    resetHttpErrors()
    setState({ data: result })
    isPassowrdForgotten = true
  }
  return isPassowrdForgotten
}

watchEffect(() => {
  setState({ data: loginData.value })
})

export {
  loadLoginData,
  loginStateUser,
  getAuthCredentials,
  clearLoginState,
  resetStatePassword,
  performLogout,
  setState,
  authCredentials,
  loginData
}
