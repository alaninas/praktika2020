import { setState, loadState, clearState } from '@/modules/states/user'
import { getPasswordFromUser } from '@/modules/utilities/user-utility'
import { passData } from '@/modules/types/IPassword'
import { deleteOneImage } from '@/modules/utilities/gallery/gallery-utility'
import { setHttpErrorImage } from '../states/formErrors'
import { to } from '../utilities/index-utility'

export async function useUser ({ userId = '', noDataReload = true, createGallery = false }: { userId?: string; noDataReload?: boolean; createGallery?: boolean }) {
  const user = await loadState({ userId, noDataReload, createGallery })

  function clearUserData () {
    clearState()
  }

  async function deletePictureInGallery (image: string): Promise<string[] | undefined> {
    if (user.value._id && image && image.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [error, result] = await to(deleteOneImage(user.value._id, image))
      if (error) setHttpErrorImage({ message: `Can not delete image: ${image}` })
    }
    console.log('>>>> image deleted')
    console.log(image)
    return (await loadState({ userId: user.value._id || '', noDataReload: false, createGallery: true })).value.images
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

  return { user, clearUserData, updateUserPassword, preparePasswordForServer, deletePictureInGallery }
}
