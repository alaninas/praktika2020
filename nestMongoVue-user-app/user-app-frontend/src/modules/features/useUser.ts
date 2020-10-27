import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import { watchEffect } from 'vue'
import { setUserErrors, clearUserErrors } from '@/modules/features/useUserErrors'
import { userErrors } from '@/modules/states/userErrors'
import { user } from '@/modules/states/user'

export function useUser () {
  function getUser () {
    return user
  }

  function setUserAddress (inputAddress: AddressInterface): UserInterface {
    user.value.street = inputAddress.street
    user.value.houseNumber = parseInt(inputAddress.houseNumber)
    user.value.zipCode = parseInt(inputAddress.zipCode)
    user.value.city = inputAddress.city
    user.value.address = Object.values(inputAddress).join(', ')
    return user.value
  }

  function setFullnameSring (inputUser: UserInterface): UserInterface {
    if (!inputUser.firstname || !inputUser.lastname) return user.value
    user.value.fullname = [inputUser.firstname, inputUser.lastname].join(' ')
    return user.value
  }

  function setUser (inputUser: UserInterface): UserInterface {
    const { street, houseNumber, city, zipCode } = { street: inputUser.street, houseNumber: inputUser.houseNumber?.toString(), city: inputUser.city, zipCode: inputUser.zipCode?.toString() }
    user.value.password = inputUser.password
    user.value.passwordConfirm = inputUser.passwordConfirm
    user.value.email = inputUser.email
    user.value.firstname = inputUser.firstname
    user.value.lastname = inputUser.lastname
    user.value.country = inputUser.country
    if (inputUser.age) user.value.age = parseInt(inputUser.age.toString())
    setFullnameSring(user.value)
    if (street && houseNumber && city && zipCode) setUserAddress({ street, houseNumber, city, zipCode } as AddressInterface)
    return user.value
  }

  function resetUserErrors () {
    clearUserErrors()
  }

  function getUserErrors () {
    return userErrors
  }

  watchEffect(async () => {
    setUser(user.value)
    await setUserErrors(user.value)
  })

  return { user, getUser, setUser, setUserAddress, getUserErrors, resetUserErrors, userErrors }
}
