import { watch } from 'vue'
import LoginInterface from '@/modules/types/ILogin'
import { loadLoginData, loginStateUser, clearLoginState, accessToken, isAuthenticated, performLogout, resetStatePassword } from '@/modules/states/login'

export function useLogin ({ userLoginInit = { email: '', password: '', _id: '' } as LoginInterface, noDataReload = true }: { userLoginInit?: LoginInterface; noDataReload?: boolean }) {
  const userLoginData = loadLoginData(userLoginInit, noDataReload)
  const isLoggedIn = isAuthenticated
  const token = accessToken

  async function loginUser () {
    loginStateUser(userLoginData.value).catch(err => console.log(err.message))
  }

  async function resetPassword () {
    resetStatePassword(userLoginData.value).catch(err => console.log(err.message))
  }

  function logoutUser () {
    performLogout()
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

  return { userLoginData, isLoggedIn, token, loginUser, logoutUser, clearLoginData, resetPassword }
}
