import { ref, Ref } from 'vue'
import { createUploadConfig, sendFileToServer, setDefaultCaption, setUserCaption, files, addFile, removeFile, setState } from '../states/fileUpload'
import { httpErrors, setHttpErrorsField } from '../states/formErrors'
import { loadGallery } from '../states/user'
import { UploadFileInterface } from '../types/IUploadFile'
import { createFileInputErrors, doesFileHaveInputErrors, fileCountLimit, isFileCountAcceptable, getFileErrorString } from '../utilities/fileUpload/fileupload-utility'

export async function useFileUpload () {
  function updateCaption (newVal: string) {
    setDefaultCaption(newVal)
  }

  function addFilesFromInputFileList (inputImages: FileList | null): boolean {
    if (!inputImages) return false
    for (let i = 0; i < inputImages.length; i++) {
      const errors = createFileInputErrors(inputImages[i])
      const progress = 0
      addFile({ data: inputImages[i], errors, progress } as UploadFileInterface)
    }
    const imcount = files.value.length
    if (!isFileCountAcceptable(imcount)) setHttpErrorsField({ field: 'imagescount', message: `Images count: ${imcount} exceeds the current limit ${fileCountLimit}.` })
    return true
  }

  async function cleanUploads () {
    const notUploaded: Ref<UploadFileInterface[]> = ref([])
    for (let i = 0; i < files.value.length; i++) {
      if (!files.value[i].isUploaded) notUploaded.value.push(files.value[i])
    }
    setState(notUploaded.value)
  }

  async function performFileUpload ({ id, i }: { id: string; i: number }) {
    if (doesFileHaveInputErrors(files.value[i]) || httpErrors.value.imagescount) return false
    setUserCaption(i)
    await sendFileToServer({ id, i, config: createUploadConfig(i) })
    // await loadGallery(id)
    return true
  }

  async function submitFiles (id: string) {
    for (let i = 0; i < files.value.length; i++) {
      if (!files.value[i].isUploaded) await performFileUpload({ id, i })
    }
    await loadGallery(id)
  }

  function getFileUploadErrorText (index: number): string {
    try {
      const f = files.value[index]
      const err = f.errors
      if (!err) return ''
      return getFileErrorString.httpresponse(err, f.progress) + getFileErrorString.size(err) + getFileErrorString.format(err)
    } catch (error) {
      return ''
    }
  }
  return { files, updateCaption, performFileUpload, submitFiles, addFilesFromInputFileList, getFileUploadErrorText, removeFile, cleanUploads }
}
