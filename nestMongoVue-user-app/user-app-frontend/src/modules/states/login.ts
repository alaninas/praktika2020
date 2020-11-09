import LoginInterface, { authCredentialsType } from '@/modules/types/ILogin'
import { ref, Ref, watch } from 'vue'
import { resetValidationErrors } from '@/modules/states/formErrors'
import { tokenService } from '@/modules/services/token-service'
import { resetUserPassword, loginUser } from '../utilities/login-utility'
import { to } from '@/modules/utilities/index-utility'

const loginData = ref({ password: '', email: tokenService.getUsername() || '', _id: tokenService.getUserId() || '' } as LoginInterface)
const authCredentials = ref(tokenService.getAuthCredentials())

const history = []
history.push(loginData.value)

function setState ({ data = { password: '', email: '', _id: '' } }: {data?: LoginInterface}) {
  console.log('--> my login SetState')
  loginData.value = data
  authCredentials.value = tokenService.getAuthCredentials()
}

function getAuthCredentials (): authCredentialsType {
  return authCredentials.value
}

function clearLoginState () {
  resetValidationErrors()
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
  if (error) throw new Error(`Password incorrect for user: ${userLogin.email}`)
  setState({ data: result })
}

async function resetStatePassword (userLogin: LoginInterface) {
  userLogin.password = ''
  const [error, result] = await to(resetUserPassword(userLogin))
  if (error) throw error
  setState({ data: result })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(loginData, (loginData) => {
  history.push(loginData)
  console.log('>> from login state watcher')
  console.log(loginData)
  console.log(authCredentials.value)
  console.log(history.length)
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
