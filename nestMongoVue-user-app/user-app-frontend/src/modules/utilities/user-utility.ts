import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import PasswordInterface from '@/modules/types/IPassword'

function displayUserData (user: UserInterface): string {
  const { age, email, fullname, country, address, website } = user
  const init = [age, email, fullname, country, address, website]
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

function prepareUserProperties (inputUser: UserInterface): UserInterface {
  const { firstname, lastname, passwordConfirm, password, email, _id, country, age } = inputUser
  inputUser.firstname = firstname || ''
  inputUser.lastname = lastname || ''
  inputUser.fullname = firstname && lastname ? [firstname, lastname].join(' ') : ''
  inputUser.password = password
  inputUser.passwordConfirm = passwordConfirm
  inputUser.email = email
  inputUser._id = _id
  inputUser.country = country || ''
  if (age) inputUser.age = parseInt(age.toString())
  return inputUser
}

export {
  displayUserData,
  getAddressFromUser,
  getPasswordFromUser,
  prepareUserProperties
}
