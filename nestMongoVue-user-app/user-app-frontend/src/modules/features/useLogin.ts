import { watch } from 'vue'
import LoginInterface from '@/modules/types/ILogin'
import { loadLoginData, loginStateUser, clearLoginState, authCredentials, performLogout, resetStatePassword } from '@/modules/states/login'

export function useLogin ({ userLoginInit = { email: '', password: '', _id: '' } as LoginInterface, noDataReload = true }: { userLoginInit?: LoginInterface; noDataReload?: boolean }) {
  const userLoginData = loadLoginData(userLoginInit, noDataReload)
  const creds = authCredentials

  function loginUser () {
    loginStateUser(userLoginData.value)
  }

  function resetPassword () {
    resetStatePassword(userLoginData.value)
  }

  function logoutUser () {
    performLogout()
  }

  function clearLoginData () {
    clearLoginState()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  watch(creds, (creds) => {
    console.log('---> check logging.... ')
    console.log(creds)
  })

  return { userLoginData, creds, loginUser, logoutUser, clearLoginData, resetPassword }
}
