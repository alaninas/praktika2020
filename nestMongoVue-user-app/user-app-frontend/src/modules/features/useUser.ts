import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import { getState, setState, setStateAddress, loadUser, clearState } from '@/modules/states/user'

export async function useUser ({ userId = '', noDataReload = true }: { userId?: string; noDataReload?: boolean }) {
  const user = await loadUser(userId, noDataReload)

  function setUserAddress (address: AddressInterface): UserInterface {
    if (!address) address = { street: '', houseNumber: '', city: '', zipCode: '' }
    return setStateAddress(address)
  }

  function setUser (user: UserInterface): UserInterface {
    return setState(user)
  }

  function clearUserData () {
    clearState()
  }

  return { user, setUser, setUserAddress, clearUserData }
}
