import { ref, Ref, watchEffect } from 'vue'
import UserInterface, { GalleryInterface, ImageInterface } from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import { createGallery, getAddressFromUser, setAddressProperties, setBasicProperties, setGallery, setImages } from '@/modules/utilities/user-utility'
import { resetFormErrors, setHttpErrorsField, setUserErrorsPassword } from './formErrors'
import { getUsersStateUser } from './users'
import { purgeImage } from '../utilities/gallery/gallery-utility'
import { to } from '../utilities/index-utility'
import { putUserUpdatedImage } from '../services'

const user: Ref<UserInterface> = ref({} as UserInterface)

function getState () {
  return user
}

function getStateEmail () {
  return user.value.email
}

function setStateAddress ({ inputAddress = { street: '', houseNumber: '', city: '', zipCode: '' } }: { inputAddress?: AddressInterface }): UserInterface {
  setAddressProperties(user.value, inputAddress)
  return user.value
}

function setState (inputUser: UserInterface): UserInterface {
  resetFormErrors()
  setBasicProperties(user.value, inputUser)
  setStateAddress({ inputAddress: getAddressFromUser(inputUser) })
  setUserErrorsPassword(user.value)
  return user.value
}

function clearState () {
  user.value = {} as UserInterface
  resetFormErrors()
}

async function initGallery (inputUser: UserInterface) {
  await createGallery(inputUser)
  setImages(user.value, inputUser.images)
  setGallery(user.value, inputUser.gallery)
}

async function loadGallery (userId: string | undefined): Promise<Ref<UserInterface>> {
  if (!userId) return getState()
  const myUser = await getUsersStateUser(userId)
  await initGallery(myUser)
  return getState()
}

async function loadState ({ userId, noDataReload, createGallery }: { userId: string; noDataReload: boolean; createGallery: boolean }): Promise<Ref<UserInterface>> {
  const myUser = userId ? await getUsersStateUser(userId) : {} as UserInterface
  if (noDataReload) return getState()
  if (!userId || getState().value._id !== myUser._id || getState().value._id === '' || getState().value._id) {
    clearState()
    if (createGallery && myUser.images) {
      await initGallery(myUser)
    }
    setState(myUser)
  }
  return getState()
}

async function deleteUserPicture ({ inputUser, image }: { inputUser: UserInterface; image: string }): Promise<ImageInterface[] | undefined> {
  if (inputUser._id && image && image.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, result] = await to(purgeImage(inputUser._id, image))
    if (error) alert(`Can not delete image: ${image}`)
  }
  return (await loadGallery(inputUser._id)).value.images
}

async function updateGalleryPicture ({ id, galleryPicture }: { id: string; galleryPicture: GalleryInterface }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, result] = await to(putUserUpdatedImage({ obj: { image: galleryPicture.file, imagecaption: galleryPicture.caption }, id }))
  if (error) setHttpErrorsField({ field: 'imagesresponse', message: error.message })
  if (result) await loadGallery(id)
}

watchEffect(() => {
  setState(user.value)
})

export {
  user,
  getState,
  setState,
  setStateAddress,
  loadState,
  clearState,
  getStateEmail,
  initGallery,
  loadGallery,
  deleteUserPicture,
  updateGalleryPicture
}
