import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'

function displayUserData (user: UserInterface): string {
  const { age, email, fullname, country, address } = user
  const init = [age, email, fullname, country, address]
  const arr: (string | number)[] = []
  init.forEach(element => {
    if (element) arr.push(element)
  })
  return arr.join(', ')
}

function getAddressFromUser (inputUser: UserInterface): AddressInterface {
  const { street, houseNumber, city, zipCode } = {
    street: inputUser.street || '', houseNumber: inputUser.houseNumber?.toString() || '', city: inputUser.city || '', zipCode: inputUser.zipCode?.toString() || ''
  }
  return { street, houseNumber, city, zipCode }
}

export {
  displayUserData,
  getAddressFromUser
}
