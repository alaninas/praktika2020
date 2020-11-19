import { setState, loadState, clearState, deleteUserPicture } from '@/modules/states/user'
import { getPasswordFromUser } from '@/modules/utilities/user-utility'
import { passData } from '@/modules/types/IPassword'

export async function useUser ({ userId = '', noDataReload = true, createGallery = false }: { userId?: string; noDataReload?: boolean; createGallery?: boolean }) {
  const user = await loadState({ userId, noDataReload, createGallery })

  function clearUserData () {
    clearState()
  }

  async function deletePictureInGallery (image: string): Promise<string[] | undefined> {
    return await deleteUserPicture({ inputUser: user.value, image })
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
