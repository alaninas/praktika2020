import { ref, Ref, watchEffect } from 'vue'
import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import { getAddressFromUser, prepareUserProperties } from '@/modules/utilities/user-utility'
import { resetFormErrors, setUserErrors } from './formErrors'
import { getUsersStateUser } from './users'

const user: Ref<UserInterface> = ref({} as UserInterface)

const history = []
history.push(user.value)

function getState () {
  return user
}

function setStateAddress ({ inputAddress = { street: '', houseNumber: '', city: '', zipCode: '' } }: { inputAddress?: AddressInterface }): UserInterface {
  const { street, houseNumber, city, zipCode } = inputAddress
  user.value.street = street
  user.value.houseNumber = parseInt(houseNumber)
  user.value.zipCode = parseInt(zipCode)
  user.value.city = city
  if (street && houseNumber && city && zipCode) user.value.address = Object.values(inputAddress).join(', ')
  return user.value
}

function setState (inputUser: UserInterface): UserInterface {
  user.value = prepareUserProperties(inputUser)
  setStateAddress({ inputAddress: getAddressFromUser(inputUser) })
  setUserErrors(user.value)
  console.log('>> from user setState')
  console.log(user.value)
  return user.value
}

function clearState () {
  user.value = {} as UserInterface
  resetFormErrors()
}

async function loadState (userId: string, noDataReload: boolean): Promise<Ref<UserInterface>> {
  const myUser = userId ? await getUsersStateUser(userId) : {} as UserInterface
  if (!noDataReload) {
    if (!userId || getState().value._id !== myUser._id || getState().value._id === '' || getState().value._id) {
      clearState()
      setState(myUser)
    }
  }
  return getState()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watchEffect(() => {
  setState(user.value)
  // TODO: debug prints to remove
  console.log('>> from user watcher')
  console.log(user.value)
  history.push(user.value)
  console.log(history.length)
})

export {
  user,
  getState,
  setState,
  setStateAddress,
  loadState,
  clearState
}
