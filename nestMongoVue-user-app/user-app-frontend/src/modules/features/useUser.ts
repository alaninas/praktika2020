import UserInterface from '@/modules/types/IUser'
import { getState, setState, loadUser, clearState } from '@/modules/states/user'

export async function useUser ({ userId = '', noDataReload = true }: { userId?: string; noDataReload?: boolean }) {
  const user = await loadUser(userId, noDataReload)

  function setUser (user: UserInterface): UserInterface {
    return setState(user)
  }

  function clearUserData () {
    clearState()
  }

  return { user, setUser, clearUserData }
}
