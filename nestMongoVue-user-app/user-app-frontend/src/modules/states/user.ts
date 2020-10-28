import { ref, Ref, watchEffect } from 'vue'
import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import { getUserErrors, setUserErrors, clearUserErrors } from '@/modules/features/useUserErrors'
import { resetValidationErrors } from '@/modules/features/useValidationErrors'

const user: Ref<UserInterface> = ref({} as UserInterface)

const history = []
history.push(user.value)

function getState () {
  return user
}

function setStateAddress (inputAddress: AddressInterface): UserInterface {
  user.value.street = inputAddress.street
  user.value.houseNumber = parseInt(inputAddress.houseNumber)
  user.value.zipCode = parseInt(inputAddress.zipCode)
  user.value.city = inputAddress.city
  user.value.address = Object.values(inputAddress).join(', ')
  return user.value
}

function setStateFullname (inputUser: UserInterface): UserInterface {
  if (!inputUser.firstname || !inputUser.lastname) return user.value
  user.value.fullname = [inputUser.firstname, inputUser.lastname].join(' ')
  return user.value
}

function setLoginData (inputUser: UserInterface) {
  user.value.password = inputUser.password
  user.value.passwordConfirm = inputUser.passwordConfirm
  user.value.email = inputUser.email
  user.value._id = inputUser._id
}

function setNameData (inputUser: UserInterface) {
  user.value.firstname = inputUser.firstname
  user.value.lastname = inputUser.lastname
  setStateFullname(user.value)
}

function setState (inputUser: UserInterface): UserInterface {
  setLoginData(inputUser)
  if (inputUser.age) user.value.age = parseInt(inputUser.age.toString())
  setNameData(inputUser)
  user.value.country = inputUser.country
  const { street, houseNumber, city, zipCode } = { street: inputUser.street, houseNumber: inputUser.houseNumber?.toString(), city: inputUser.city, zipCode: inputUser.zipCode?.toString() }
  if (street && houseNumber && city && zipCode) setStateAddress({ street, houseNumber, city, zipCode } as AddressInterface)
  return user.value
}

function resetStateErrors () {
  clearUserErrors()
}

function getStateErrors () {
  return getUserErrors()
}

function clearState () {
  user.value = {} as UserInterface
}

function loadUser (myUser: Ref<UserInterface>, noDataReload: boolean): Ref<UserInterface> {
  if (!noDataReload) {
    clearState()
    setState(myUser.value)
    resetStateErrors()
    resetValidationErrors()
  }
  return getState()
}

watchEffect(async () => {
  setState(user.value)
  // TODO: debug prints to remove
  console.log('from user watcher')
  console.log(user.value)
  history.push(user.value)
  console.log(history.length)
  await setUserErrors(user.value)
})

export {
  getState,
  setState,
  setStateAddress,
  getStateErrors,
  resetStateErrors,
  setStateFullname,
  loadUser
}
