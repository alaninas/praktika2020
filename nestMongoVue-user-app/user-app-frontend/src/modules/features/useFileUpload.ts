import { getUploadConfig, sendFileToServer, setCaption, setUserCaption, files, addFilesFromInputFileList, getFileErrorText, dragEventHandler, removeFile } from '../states/fileUpload'
import { loadGallery } from '../states/user'
import { useUser } from './useUser'

export async function useFileUpload () {
  const { user } = await useUser({})

  function updateCaption (newVal: string) {
    setCaption(newVal)
  }
  async function performFileUpload ({ id, i }: { id: string; i: number }) {
    // Here first and foremost check if current file has no input errors
    setUserCaption(i)
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

  return { files, updateCaption, performFileUpload, addFilesFromInput, getFileErrorText, dragEventHandler, removeFile }
}
