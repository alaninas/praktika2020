import LoginInterface, { authCredentialsType } from '@/modules/types/ILogin'
import { ref, Ref, watchEffect } from 'vue'
import { resetHttpErrorMessage, resetValidationErrors, httpErrorMessage } from '@/modules/states/formErrors'
import { tokenService } from '@/modules/services/token-service'
import { resetUserPassword, loginUser } from '../utilities/login-utility'
import { to } from '@/modules/utilities/index-utility'

const loginData = ref({ password: '', email: tokenService.getUsername() || '', _id: tokenService.getUserId() || '' } as LoginInterface)
const authCredentials = ref(tokenService.getAuthCredentials())

const history = []
history.push(loginData.value)

function setState ({ data = { password: '', email: '', _id: '' } }: {data?: LoginInterface}) {
  loginData.value = data
  authCredentials.value = tokenService.getAuthCredentials()
  if (loginData.value.email === '') httpErrorMessage.value.pswdReset = ''
  if (loginData.value.password === '') httpErrorMessage.value.userLogin = ''
}

function getAuthCredentials (): authCredentialsType {
  return authCredentials.value
}

function clearLoginState () {
  resetValidationErrors()
  resetHttpErrorMessage()
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
  if (error) httpErrorMessage.value.userLogin = `Password incorrect for user: ${userLogin.email}`
  if (result) setState({ data: result })
}

async function resetStatePassword (userLogin: LoginInterface) {
  userLogin.password = ''
  const [error, result] = await to(resetUserPassword(userLogin))
  if (error) httpErrorMessage.value.pswdReset = error.message
  if (result) setState({ data: result })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  authCredentials,
  loginData
}
