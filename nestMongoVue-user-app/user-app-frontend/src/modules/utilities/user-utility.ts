import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import PasswordInterface from '@/modules/types/IPassword'
import { getImageUrl } from '@/modules/utilities/gallery/gallery-utility'

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

function prepareAddressProperties (inputUser: UserInterface, inputAddress: AddressInterface): UserInterface {
  const { street, houseNumber, city, zipCode } = inputAddress
  inputUser.street = street
  inputUser.houseNumber = parseInt(houseNumber)
  inputUser.zipCode = parseInt(zipCode)
  inputUser.city = city
  if (street && houseNumber && city && zipCode) inputUser.address = Object.values(inputAddress).join(', ')
  return inputUser
}

function prepareBasicProperties (inputUser: UserInterface): UserInterface {
  const { firstname, lastname, passwordConfirm, password, email, _id, country, age, images } = inputUser
  inputUser.firstname = firstname || ''
  inputUser.lastname = lastname || ''
  inputUser.fullname = firstname && lastname ? [firstname, lastname].join(' ') : ''
  inputUser.password = password
  inputUser.passwordConfirm = passwordConfirm
  inputUser.email = email
  inputUser._id = _id
  inputUser.images = images
  inputUser.country = country || ''
  if (age) inputUser.age = parseInt(age.toString())
  return inputUser
}

async function createGallery (inputUser: UserInterface): Promise<UserInterface> {
  const { _id, images } = inputUser
  inputUser.gallery = []
  if (!images || !_id) return inputUser
  for (let i = 0; i < images.length; i++) {
    const image = images[i]
    if (image && image.length > 0) {
      inputUser.gallery.push({
        link: await getImageUrl(_id, image),
        name: `User ${_id} image #${i}`,
        caption: 'No caption provided',
        file: image
      })
    }
  }
  return inputUser
}

export {
  displayUserData,
  getAddressFromUser,
  getPasswordFromUser,
  prepareBasicProperties,
  createGallery,
  prepareAddressProperties
}
