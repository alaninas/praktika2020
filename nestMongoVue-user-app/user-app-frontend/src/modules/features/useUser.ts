import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import { ref, Ref } from 'vue'

export const user: Ref<UserInterface> = ref({} as UserInterface)

export function getUser () {
  return user
}

export function setUserPersonalData (inputUser: UserInterface): UserInterface {
  user.value = inputUser
  return user.value
}

export function setUserAddress (inputAddress: AddressInterface): UserInterface {
  user.value.street = inputAddress.street
  user.value.houseNumber = parseInt(inputAddress.houseNumber)
  user.value.zipCode = parseInt(inputAddress.zipCode)
  user.value.city = inputAddress.city
  user.value.address = Object.values(inputAddress).join(', ')
  return user.value
}

export function setUser (inputUser: UserInterface): UserInterface {
  const { street, houseNumber, city, zipCode } = { street: inputUser.street, houseNumber: inputUser.houseNumber?.toString(), city: inputUser.city, zipCode: inputUser.zipCode?.toString() }
  user.value.name = inputUser.name
  user.value.password = inputUser.password
  user.value.passwordConfirm = inputUser.passwordConfirm
  user.value.email = inputUser.email
  user.value.firstName = inputUser.firstName
  user.value.lastName = inputUser.lastName
  user.value.country = inputUser.country
  user.value.age = inputUser.age
  if (street && houseNumber && city && zipCode) setUserAddress({ street, houseNumber, city, zipCode } as AddressInterface)
  return user.value
}

export function setFullnameSring (inputUser: UserInterface): UserInterface {
  if (!inputUser.firstName && !inputUser.lastName) return user.value
  user.value.fullName = [inputUser.firstName, inputUser.lastName].join(' ')
  return user.value
}
