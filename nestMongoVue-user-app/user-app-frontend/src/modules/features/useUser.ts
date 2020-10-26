import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import { ref, Ref, watchEffect } from 'vue'
import { userErrors, assignUserErrors } from '@/modules/features/useErrors'

const user: Ref<UserInterface> = ref({} as UserInterface)

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
    if (!inputUser.firstName || !inputUser.lastName) return user.value
    user.value.fullName = [inputUser.firstName, inputUser.lastName].join(' ')
    return user.value
  }

  function setUser (inputUser: UserInterface): UserInterface {
    const { street, houseNumber, city, zipCode } = { street: inputUser.street, houseNumber: inputUser.houseNumber?.toString(), city: inputUser.city, zipCode: inputUser.zipCode?.toString() }
    user.value.name = inputUser.name
    user.value.password = inputUser.password
    user.value.passwordConfirm = inputUser.passwordConfirm
    user.value.email = inputUser.email
    user.value.firstName = inputUser.firstName
    user.value.lastName = inputUser.lastName
    user.value.country = inputUser.country
    user.value.age = inputUser.age
    setFullnameSring(user.value)
    if (street && houseNumber && city && zipCode) setUserAddress({ street, houseNumber, city, zipCode } as AddressInterface)
    return user.value
  }

  async function setUserErrors (inputUser: UserInterface) {
    userErrors.value = await assignUserErrors(inputUser)
  }

  function getUserErrors () {
    return userErrors
  }

  watchEffect(async () => {
    setUser(user.value)
    await setUserErrors(user.value)
  })

  return { getUser, setUser, getUserErrors, setUserAddress }
}
