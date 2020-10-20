import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import { user } from '@/modules/types/users'

export function setUserPersonalData (inputUser: UserInterface): UserInterface {
  user.value = inputUser
  return user.value
}

export function setUserAddress (inputAddress: AddressInterface): UserInterface {
  user.value.city = inputAddress.city
  user.value.street = inputAddress.street
  user.value.housenumber = parseInt(inputAddress.number)
  user.value.zipcode = parseInt(inputAddress.zipcode)
  return user.value
}
