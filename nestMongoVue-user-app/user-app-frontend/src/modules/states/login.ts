import LoginInterface from '@/modules/types/ILogin'
import { ref, Ref, watch } from 'vue'
import { resetValidationErrors } from '@/modules/states/formErrors'
import { tokenService } from '@/modules/services/token-service'
import { resetUserPassword, loginUser } from '../utilities/login-utility'
import { to } from '@/modules/utilities/index-utility'

const loginData = ref({ password: '', email: tokenService.getUsername() || '', _id: tokenService.getUserId() || '' } as LoginInterface)
const isAuthenticated = ref(tokenService.holdsAccessToken())
const accessToken = ref(tokenService.getAccessToken())

const history = []
history.push(loginData.value)

function setState ({ data = { password: '', email: '', _id: '' } }: {data?: LoginInterface}) {
  console.log('--> my login SetState')
  loginData.value = data
  isAuthenticated.value = tokenService.holdsAccessToken()
  accessToken.value = tokenService.getAccessToken()
}

function getAuthUserId (): string {
  return loginData.value._id
}

function getIsAuth (): boolean {
  return isAuthenticated.value
}

function getToken (): string | null {
  return accessToken.value
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
  console.log(getIsAuth())
  console.log(getToken())
  console.log(history.length)
})

export {
  loadLoginData,
  loginStateUser,
  getIsAuth,
  getToken,
  getAuthUserId,
  clearLoginState,
  resetStatePassword,
  performLogout,
  isAuthenticated,
  accessToken,
  loginData
}
