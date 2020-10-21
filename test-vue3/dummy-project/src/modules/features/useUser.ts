import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import { ref, Ref } from 'vue'

export const user: Ref<UserInterface> = ref({} as UserInterface)

export function setUserPersonalData (inputUser: UserInterface): UserInterface {
  user.value = inputUser
  return user.value
}

export function setUserAddress (inputAddress: AddressInterface): UserInterface {
  user.value.city = inputAddress.city
  user.value.street = inputAddress.street
  user.value.housenumber = parseInt(inputAddress.number)
  user.value.zipcode = parseInt(inputAddress.zipcode)
  user.value.addressString = Object.values(inputAddress).join(', ')
  return user.value
}
