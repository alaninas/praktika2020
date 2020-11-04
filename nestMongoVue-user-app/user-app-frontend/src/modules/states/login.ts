import LoginInterface from '@/modules/types/ILogin'
import { ref, Ref, watch } from 'vue'
import { doUserLogout, postUserLogin } from '@/modules/services/users-service'
import { resetFormErrors } from '@/modules/states/formErrors'
import { tokenService } from '../services/token-service'

// tokenService.getUsername()
const loginData = ref({ password: '', email: tokenService.getUsername() || '' } as LoginInterface)
const loggedIn = ref(tokenService.isLoggedIn())

const history = []
history.push(loginData.value)

function setState (data: LoginInterface) {
  console.log('>>>>>> my login SetState')
  loginData.value = data
  const b = tokenService.isLoggedIn()
  loggedIn.value = b
}

function getState (): Ref<LoginInterface> {
  console.log('--> from loginGetState')
  console.log(loginData.value)
  return loginData
}

function getLog (): Ref<boolean> {
  return loggedIn
}

function loadState (data: LoginInterface, noDataReload: boolean): Ref<LoginInterface> {
  if (!noDataReload) {
    tokenService.logout()
    resetFormErrors()
    // const b = tokenService.isLoggedIn()
    setState(data)
  }
  return getState()
}

async function loginStateUser (data: LoginInterface): Promise<Ref<LoginInterface>> {
  const token = await postUserLogin(data)
  setState({ password: '', email: '' } as LoginInterface)
  setState(data)
  console.log('>>>>>> my login response')
  console.log(token)
  return getState()
}

function logoutStateUser (): Ref<LoginInterface> {
  const response = doUserLogout()
  console.log('>>>>>> my logout response')
  console.log(response)
  setState({ password: '', email: '' } as LoginInterface)
  return getState()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(loginData, (loginData) => {
  history.push(loginData)
  console.log('>> from login state watcher')
  console.log(loginData)
  console.log(loggedIn.value)
  console.log(getLog().value)
  console.log(history.length)
})

export {
  loginData,
  loadState,
  loginStateUser,
  logoutStateUser,
  getLog
}
