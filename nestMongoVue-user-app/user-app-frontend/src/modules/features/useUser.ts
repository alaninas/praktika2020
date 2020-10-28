import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import { Ref } from 'vue'
import { getState, setState, setStateAddress, getStateErrors, resetStateErrors, loadUser, clearState } from '@/modules/states/user'

export function useUser ({ myUser = getState(), noDataReload = true }: { myUser?: Ref<UserInterface>; noDataReload?: boolean }) {
  function getUser (): Ref<UserInterface> {
    return loadUser(myUser, noDataReload)
  }

  function setUserAddress (address: AddressInterface): UserInterface {
    return setStateAddress(address)
  }

  function setUser (user: UserInterface): UserInterface {
    return setState(user)
  }

  function resetUserErrors () {
    resetStateErrors()
  }

  function getUserErrors () {
    return getStateErrors()
  }

  function clearUserData () {
    clearState()
  }

  function displayUserData (user: UserInterface): string {
    const { age, email, fullname, country, address } = user
    const init = [age, email, fullname, country, address]
    const arr: (string | number)[] = []
    init.forEach(element => {
      if (element) arr.push(element)
    })
    return arr.join(', ')
  }
  return { getUser, setUser, setUserAddress, getUserErrors, resetUserErrors, displayUserData, clearUserData }
}
