import { setState, loadState, clearState } from '@/modules/states/user'
import { getPasswordFromUser } from '@/modules/utilities/user-utility'
import { passData } from '@/modules/types/IPassword'
import { deleteOneImage } from '../utilities/images-utility'

export async function useUser ({ userId = '', noDataReload = true }: { userId?: string; noDataReload?: boolean }) {
  const user = await loadState(userId, noDataReload)

  function clearUserData () {
    clearState()
  }

  async function deleteImage (image: string): Promise<string[] | undefined> {
    if (user.value._id && image && image.length > 0) {
      deleteOneImage(user.value._id, image)
        .catch(error => console.log(error.message))
    }
    return (await loadState(user.value._id || '', false)).value.images
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

  return { user, clearUserData, updateUserPassword, preparePasswordForServer, deleteImage }
}
