import { LoginInterface } from '@/modules/types/ILogin'
import { loadLoginData, loginStateUser, clearLoginState, authCredentials, performLogout, resetStatePassword } from '@/modules/states/login'

export function useLogin ({ userLoginInit = { email: '', password: '', _id: '' } as LoginInterface, noDataReload = true }: { userLoginInit?: LoginInterface; noDataReload?: boolean }) {
  const userLoginData = loadLoginData(userLoginInit, noDataReload)
  const creds = authCredentials

  function loginUser () {
    loginStateUser(userLoginData.value)
  }

  function logoutUser () {
    performLogout()
  }

  function clearLoginData () {
    clearLoginState()
  }

  async function resetPassword (isPasswordForgotten: boolean): Promise<boolean> {
    return await resetStatePassword(userLoginData.value, isPasswordForgotten)
  }

  return { userLoginData, creds, loginUser, logoutUser, clearLoginData, resetPassword }
}
