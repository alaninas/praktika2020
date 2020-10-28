import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import { Ref } from 'vue'
import { getState, setState, setStateAddress, getStateErrors, resetStateErrors, loadUser } from '@/modules/states/user'

export function useUser ({ myUser = getState(), noDataReload = true }: { myUser?: Ref<UserInterface>; noDataReload?: boolean }) {
  function getUser (): Ref<UserInterface> {
    return loadUser(myUser, noDataReload)
  }

  function setUserAddress (inputAddress: AddressInterface): UserInterface {
    return setStateAddress(inputAddress)
  }

  function setUser (inputUser: UserInterface): UserInterface {
    return setState(inputUser)
  }

  function resetUserErrors () {
    resetStateErrors()
  }

  function getUserErrors () {
    return getStateErrors()
  }

  return { getUser, setUser, setUserAddress, getUserErrors, resetUserErrors }
}
