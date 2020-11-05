import { watch } from 'vue'
import LoginInterface from '@/modules/types/ILogin'
import { loadState, loginStateUser, logoutStateUser, clearLoginState, accessToken, isAuthenticated } from '@/modules/states/login'

export function useLogin ({ userLoginInit = { email: '', password: '', _id: '' } as LoginInterface, noDataReload = true }: { userLoginInit?: LoginInterface; noDataReload?: boolean }) {
  const userLoginData = loadState(userLoginInit, noDataReload)
  const isLoggedIn = isAuthenticated
  const token = accessToken

  async function loginUser () {
    await loginStateUser(userLoginData.value)
  }

  function logoutUser () {
    logoutStateUser()
  }

  function clearLoginData () {
    clearLoginState()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  watch(isLoggedIn, (isLoggedIn) => {
    console.log('---> check logging.... ')
    console.log(`is logged in: ${isLoggedIn}`)
    console.log(`token: ${token.value}`)
  })

  return { userLoginData, isLoggedIn, token, loginUser, logoutUser, clearLoginData }
}
