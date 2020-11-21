import { setState, loadState, clearState, deleteUserPicture, updateGalleryPicture } from '@/modules/states/user'
import { getPasswordFromUser } from '@/modules/utilities/user-utility'
import { passData } from '@/modules/types/IPassword'
import { GalleryInterface, ImageInterface } from '../types/IUser'

export async function useUser ({ userId = '', noDataReload = true, createGallery = false }: { userId?: string; noDataReload?: boolean; createGallery?: boolean }) {
  const user = await loadState({ userId, noDataReload, createGallery })

  function clearUserData () {
    clearState()
  }

  function preparePasswordForServer (forgetPassword: boolean) {
    if (forgetPassword) passData.value = getPasswordFromUser(user.value)
    user.value.password = forgetPassword ? passData.value.password : undefined
    user.value.passwordConfirm = forgetPassword ? passData.value.passwordConfirm : undefined
    setState(user.value)
  }

  function updateUserPassword (forgetPassword: boolean) {
    if (forgetPassword) passData.value = getPasswordFromUser(user.value)
    user.value.password = forgetPassword ? '' : passData.value.password
    user.value.passwordConfirm = forgetPassword ? '' : passData.value.passwordConfirm
    setState(user.value)
  }

  async function deletePictureInGallery (image: string): Promise<ImageInterface[] | undefined> {
    return await deleteUserPicture({ inputUser: user.value, image })
  }

  async function updatePictureInGallery ({ id, galleryPicture }: { id: string; galleryPicture: GalleryInterface }) {
    console.log('Picture update ------>>>')
    const i = user.value.images?.findIndex(el => el.filename === galleryPicture.file)
    console.log(i)
    if (i === undefined || i < 0) return false
    await updateGalleryPicture({ id, galleryPicture })
    return true
  }

  return { user, clearUserData, updateUserPassword, preparePasswordForServer, deletePictureInGallery, updatePictureInGallery }
}
