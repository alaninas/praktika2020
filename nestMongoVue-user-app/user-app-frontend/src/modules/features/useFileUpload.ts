import { getUploadConfig, sendFileToServer, setCaption, files, addFilesFromInputFileList, getFileErrorText, dragEventHandler, removeFile } from '../states/FileUpload'
import { loadGallery } from '../states/user'
import { useUser } from './useUser'

export async function useFileUpload () {
  const { user } = await useUser({})

  async function performFileUpload ({ id, i, imagecaption }: { id: string; i: number; imagecaption: string }) {
    // Here first and foremost check if current file has no input errors
    setCaption({ i, imagecaption })
    const config = getUploadConfig(i)
    await sendFileToServer({ id, i, config })
    await loadGallery(user.value._id)
    console.log('>>>>> new user data:')
    console.log(user.value)
  }

  // TODO: set here input pre_server-send error logic for files
  // use fileUpload-utility constants
  // call it inside handlesFileInputChange()
  function addFilesFromInput (inputImages: FileList | null) {
    if (inputImages) addFilesFromInputFileList(inputImages)
    console.log('-- updated files array')
    console.log(files.value)
  }

  return { files, performFileUpload, addFilesFromInput, getFileErrorText, dragEventHandler, removeFile }
}
