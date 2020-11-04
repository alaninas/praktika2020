import { watch } from 'vue'
import LoginInterface from '../types/ILogin'
import { getLog, loadState, loginStateUser, logoutStateUser } from '../states/login'

export function useLogin ({ userLoginInit = { email: '', password: '' } as LoginInterface, noDataReload = true }: { userLoginInit?: LoginInterface; noDataReload?: boolean }) {
  const userLogin = loadState(userLoginInit, noDataReload)
  const loggedIn = getLog()

  async function loginUser () {
    await loginStateUser(userLogin.value)
  }

  function logoutUser () {
    logoutStateUser()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  watch(loggedIn, (loggedIn) => {
    console.log('---> check logging.... ')
    console.log(loggedIn)
  })

  return { userLogin, loggedIn, loginUser, logoutUser }
}
