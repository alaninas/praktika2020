import { setState, loadUser, clearState } from '@/modules/states/user'
import { getPasswordFromUser } from '@/modules/utilities/user-utility'
import { pass } from '@/modules/types/IPassword'

export async function useUser ({ userId = '', noDataReload = true }: { userId?: string; noDataReload?: boolean }) {
  const user = await loadUser(userId, noDataReload)

  function clearUserData () {
    clearState()
  }

  function sendUserPasswordToServer (forgetPassword: boolean) {
    if (forgetPassword) pass.value = getPasswordFromUser(user.value)
    user.value.password = forgetPassword ? pass.value.password : undefined
    user.value.passwordConfirm = forgetPassword ? pass.value.passwordConfirm : undefined
    setState(user.value)
  }

  function clearUserPassword (forgetPassword: boolean) {
    if (forgetPassword) pass.value = getPasswordFromUser(user.value)
    user.value.password = forgetPassword ? '' : pass.value.password
    user.value.passwordConfirm = forgetPassword ? '' : pass.value.passwordConfirm
    setState(user.value)
  }

  return { user, clearUserData, clearUserPassword, sendUserPasswordToServer }
}
