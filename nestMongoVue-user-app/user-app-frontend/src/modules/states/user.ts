import { ref, Ref, watchEffect } from 'vue'
import UserInterface from '@/modules/types/IUser'
import AddressInterface from '@/modules/types/IAddress'
import { createGallery, getAddressFromUser, setAddressProperties, setBasicProperties, setGallery } from '@/modules/utilities/user-utility'
import { resetFormErrors, setUserErrorsPassword } from './formErrors'
import { getUsersStateUser } from './users'

const user: Ref<UserInterface> = ref({} as UserInterface)

const history = []
history.push(user.value)

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
  setGallery(user.value, inputUser)
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
}

function emptyGallery () {
  user.value.gallery = []
}

async function loadGallery (userId: string | undefined): Promise<Ref<UserInterface>> {
  if (!userId) return getState()
  const myUser = await getUsersStateUser(userId)
  await initGallery(myUser)
  setGallery(user.value, myUser)
  return getState()
}

async function loadState ({ userId, noDataReload, createGallery }: { userId: string; noDataReload: boolean; createGallery: boolean }): Promise<Ref<UserInterface>> {
  const myUser = userId ? await getUsersStateUser(userId) : {} as UserInterface
  if (noDataReload) return getState()
  if (!userId || getState().value._id !== myUser._id || getState().value._id === '' || getState().value._id) {
    clearState()
    if (createGallery && myUser.images) {
      console.log('>>>>>>> got gallery images!')
      await initGallery(myUser)
    }
    setState(myUser)
  }
  return getState()
}

watchEffect(() => {
  setState(user.value)
  // TODO: debug prints to remove
  console.log('>> from user watcher')
  console.log(user.value)
  history.push(user.value)
  console.log(history.length)
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
  emptyGallery,
  loadGallery
}
