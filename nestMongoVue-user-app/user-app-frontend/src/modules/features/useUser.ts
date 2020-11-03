import { setState, loadUser, clearState } from '@/modules/states/user'
import { getPasswordFromUser } from '@/modules/utilities/user-utility'
import { passData } from '@/modules/types/IPassword'

export async function useUser ({ userId = '', noDataReload = true }: { userId?: string; noDataReload?: boolean }) {
  const user = await loadUser(userId, noDataReload)

  function clearUserData () {
    clearState()
  }

  function sendUserPasswordToServer (forgetPassword: boolean) {
    if (forgetPassword) passData.value = getPasswordFromUser(user.value)
    user.value.password = forgetPassword ? passData.value.password : undefined
    user.value.passwordConfirm = forgetPassword ? passData.value.passwordConfirm : undefined
    setState(user.value)
  }

  function clearUserPassword (forgetPassword: boolean) {
    if (forgetPassword) passData.value = getPasswordFromUser(user.value)
    user.value.password = forgetPassword ? '' : passData.value.password
    user.value.passwordConfirm = forgetPassword ? '' : passData.value.passwordConfirm
    setState(user.value)
  }

  return { user, clearUserData, clearUserPassword, sendUserPasswordToServer }
}
