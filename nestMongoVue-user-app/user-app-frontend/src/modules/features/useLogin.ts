import { watch } from 'vue'
import LoginInterface from '../types/ILogin'
import { getLog, getToken, loadState, loginStateUser, logoutStateUser } from '../states/login'

export function useLogin ({ userLoginInit = { email: '', password: '', _id: '' } as LoginInterface, noDataReload = true }: { userLoginInit?: LoginInterface; noDataReload?: boolean }) {
  const userLogin = loadState(userLoginInit, noDataReload)
  const loggedIn = getLog()
  const loggedToken = getToken()

  async function loginUser () {
    await loginStateUser(userLogin.value)
  }

  function logoutUser () {
    logoutStateUser()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  watch(loggedIn, (loggedIn) => {
    console.log('---> check logging.... ')
    console.log(`is logged in: ${loggedIn}`)
    console.log(`token: ${loggedToken.value}`)
  })

  return { userLogin, loggedIn, loginUser, logoutUser, loggedToken }
}
