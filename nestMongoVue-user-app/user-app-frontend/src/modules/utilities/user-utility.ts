import UserInterface, { GalleryInterface } from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import PasswordInterface from '@/modules/types/IPassword'
import { createImageUrl } from '@/modules/utilities/gallery/gallery-utility'
import { to } from './index-utility'

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

function setAddressProperties (user: UserInterface, inputAddress: AddressInterface): UserInterface {
  const { street, houseNumber, city, zipCode } = inputAddress
  user.street = street
  user.houseNumber = parseInt(houseNumber)
  user.zipCode = parseInt(zipCode)
  user.city = city
  if (street && houseNumber && city && zipCode) user.address = Object.values(inputAddress).join(', ')
  return user
}

function setImages (user: UserInterface, images: string[] | undefined): UserInterface {
  // const { gallery } = inputUser
  user.images = images
  return user
}

function setGallery (user: UserInterface, gallery: GalleryInterface[] | undefined): UserInterface {
  // const { gallery } = inputUser
  user.gallery = gallery
  return user
}

function setBasicProperties (user: UserInterface, inputUser: UserInterface): UserInterface {
  const { firstname, lastname, passwordConfirm, password, email, _id, country, age } = inputUser
  user.firstname = firstname || ''
  user.lastname = lastname || ''
  user.fullname = firstname && lastname ? [firstname, lastname].join(' ') : ''
  user.password = password
  user.passwordConfirm = passwordConfirm
  user.email = email
  user._id = _id
  // user.images = images
  // user.gallery = gallery
  user.country = country || ''
  if (age) user.age = parseInt(age.toString())
  return user
}

async function createGallery (user: UserInterface): Promise<UserInterface> {
  const { _id, images } = user
  user.gallery = []
  if (!images || !_id) return user
  for (let i = 0; i < images.length; i++) {
    const image = images[i]
    if (image && image.length > 0) {
      const [error, result] = await to(createImageUrl(_id, image))
      user.gallery.push({
        // TODO: static pic as placeholder for unavailable pics
        link: error ? '' : result,
        name: `User ${_id} image #${i}`,
        caption: 'No caption provided',
        file: image
      })
    }
  }
  return user
}

export {
  displayUserData,
  getAddressFromUser,
  getPasswordFromUser,
  setBasicProperties,
  createGallery,
  setAddressProperties,
  setGallery,
  setImages
}
