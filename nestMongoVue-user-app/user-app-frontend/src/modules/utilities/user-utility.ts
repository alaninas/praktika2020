import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import PasswordInterface from '@/modules/types/IPassword'
import LoginInterface from '@/modules/types/ILogin'

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

function getPasswordFromUser (inputUser: UserInterface): PasswordInterface {
  const { password, passwordConfirm } = {
    password: inputUser.password || '', passwordConfirm: inputUser.passwordConfirm || ''
  }
  return { password, passwordConfirm }
}

function getLoginFromUser (inputUser: UserInterface): LoginInterface {
  const { password, email, _id } = {
    password: inputUser.password || '', email: inputUser.email || '', _id: inputUser._id || ''
  }
  return { password, email, _id }
}

export {
  displayUserData,
  getAddressFromUser,
  getPasswordFromUser,
  getLoginFromUser
}
