import LoginInterface from '@/modules/types/ILogin'
import { ref, Ref, watch } from 'vue'
import { resetValidationErrors } from '@/modules/states/formErrors'
import { tokenService } from '@/modules/services/token-service'
import { loginUsersStateUser } from './users'

const loginData = ref({ password: '', email: tokenService.getUsername() || '', _id: tokenService.getUserId() || '' } as LoginInterface)
const isAuthenticated = ref(tokenService.holdsAccessToken())
const accessToken = ref(tokenService.getAccessToken())

const history = []
history.push(loginData.value)

function setState (data: LoginInterface) {
  console.log('--> my login SetState')
  loginData.value = data
  isAuthenticated.value = tokenService.holdsAccessToken()
  accessToken.value = tokenService.getAccessToken()
}

function getState (): Ref<LoginInterface> {
  console.log('--> from loginGetState')
  console.log(loginData.value)
  return loginData
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

function resetState () {
  setState({ password: '', email: '', _id: '' } as LoginInterface)
}

function clearLoginState () {
  resetValidationErrors()
  resetState()
}

function performLogout () {
  tokenService.logout()
  clearLoginState()
}

function loadState (data: LoginInterface, noDataReload: boolean): Ref<LoginInterface> {
  if (!noDataReload) {
    performLogout()
    setState(data)
  }
  return getState()
}

async function loginStateUser (data: LoginInterface): Promise<Ref<LoginInterface>> {
  const response = await loginUsersStateUser(data)
  resetState()
  setState(response)
  return getState()
}

function logoutStateUser (): Ref<LoginInterface> {
  performLogout()
  return getState()
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
  loadState,
  loginStateUser,
  logoutStateUser,
  getIsAuth,
  getToken,
  getAuthUserId,
  clearLoginState,
  isAuthenticated,
  accessToken,
  loginData
}
