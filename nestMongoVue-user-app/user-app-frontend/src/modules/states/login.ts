import LoginInterface, { loginData } from '@/modules/types/ILogin'
import { Ref, watch } from 'vue'
import { doUserLogout, postUserLogin } from '@/modules/services/users-service'
import { resetFormErrors } from '@/modules/states/formErrors'

const history = []
history.push(loginData.value)

function setState (data: LoginInterface) {
  loginData.value = data
}

function getState (): Ref<LoginInterface> {
  return loginData
}

function loadState (data: LoginInterface): Ref<LoginInterface> {
  resetFormErrors()
  setState(data)
  return getState()
}

async function loginUser (data: LoginInterface) {
  const token = await postUserLogin(data)
  console.log('>>>>>> my login response')
  console.log(token)
  return getState()
}

async function logoutUser () {
  const response = await doUserLogout()
  console.log('>>>>>> my login response')
  console.log(response)
  setState({ password: '', email: '' } as LoginInterface)
  return getState()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(loginData, (loginData) => {
  history.push(loginData)
  console.log('>> from login state watcher')
  console.log(history.length)
})

export {
  loginData,
  loadState,
  loginUser,
  logoutUser
}
