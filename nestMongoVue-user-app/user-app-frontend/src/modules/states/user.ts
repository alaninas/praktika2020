import { ref, Ref, watchEffect } from 'vue'
import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import { resetFormErrors, setUserErrors } from '@/modules/states/formErrors'
import { getAddressFromUser } from '@/modules/utilities/user-utility'
import { getStateUser } from '@/modules/states/users'

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

function setStateFullname (inputUser: UserInterface): UserInterface {
  user.value.fullname = inputUser.firstname && inputUser.lastname ? [inputUser.firstname, inputUser.lastname].join(' ') : ''
  return user.value
}

function setNameData (inputUser: UserInterface) {
  user.value.firstname = inputUser.firstname || ''
  user.value.lastname = inputUser.lastname || ''
  setStateFullname(user.value)
}

function setStatePassword (inputUser: UserInterface) {
  user.value.password = inputUser.password
  user.value.passwordConfirm = inputUser.passwordConfirm
}

function setStateLogin (inputUser: UserInterface) {
  setStatePassword(inputUser)
  user.value.email = inputUser.email
  user.value._id = inputUser._id
}

function setState (inputUser: UserInterface): UserInterface {
  setStateLogin(inputUser)
  if (inputUser.age) user.value.age = parseInt(inputUser.age.toString())
  setNameData(inputUser)
  user.value.country = inputUser.country || ''
  setStateAddress({ inputAddress: getAddressFromUser(inputUser) })
  setUserErrors(user.value)
  return user.value
}

function clearState () {
  user.value = {} as UserInterface
  resetFormErrors()
}

async function loadUser (userId: string, noDataReload: boolean): Promise<Ref<UserInterface>> {
  const myUser = userId ? await getStateUser(userId) : {} as UserInterface
  if (!noDataReload) {
    if (!userId || getState().value._id !== myUser._id) {
      clearState()
      setState(myUser)
    }
  }
  return getState()
}

watchEffect(() => {
  setState(user.value)
  // TODO: debug prints to remove
  console.log('>> from user watcher')
  history.push(user.value)
  console.log(history.length)
})

export {
  user,
  getState,
  setState,
  setStateAddress,
  setStateFullname,
  loadUser,
  clearState,
  setStatePassword,
  setStateLogin,
  resetFormErrors
}
