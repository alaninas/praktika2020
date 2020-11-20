import { ref, Ref } from 'vue'
import { getUploadConfig, sendFileToServer, setDefaultCaption, setUserCaption, files, addFile, removeFile, setState } from '../states/fileUpload'
import { httpErrors, setHttpErrorsField } from '../states/formErrors'
import { loadGallery } from '../states/user'
import { UploadFileInterface } from '../types/IUploadFile'
import { createFileInputErrors, doesFileHaveInputErrors, fileCountLimit, isFileCountAcceptable, getFileErrorString } from '../utilities/fileUpload/fileupload-utility'
import { setEventTargetDisplay, setTargetStyleField } from '../utilities/fileUpload/targetSetters-utility'

export async function useFileUpload () {
  function updateCaption (newVal: string) {
    setDefaultCaption(newVal)
  }

  function addFilesFromInputFileList (inputImages: FileList | null): boolean {
    if (!inputImages) return false
    for (let i = 0; i < inputImages.length; i++) {
      const errors = createFileInputErrors(inputImages[i])
      addFile(inputImages[i], errors)
    }
    console.log('-- updated files array')
    console.log(files.value)
    const imcount = files.value.length
    if (!isFileCountAcceptable(imcount)) setHttpErrorsField({ field: 'imagescount', message: `Images count: ${imcount} exceeds the current limit ${fileCountLimit}.` })
    return true
  }

  const dragEventHandler = {
    dragStart (event: DragEvent) {
      setTargetStyleField({ target: event.target, field: 'opacity', attr: '0.75' })
    },
    dragOver (event: DragEvent) {
      setEventTargetDisplay({ target: event.target, background: '#e64040', text: 'Drop new images here...' })
    },
    dragLeave (event: DragEvent) {
      setEventTargetDisplay({ target: event.target, background: '', opacity: '', text: 'Drag files here...' })
    },
    drop (event: DragEvent) {
      if (event && event.dataTransfer) {
        addFilesFromInputFileList(event.dataTransfer.files)
        setEventTargetDisplay({ target: event.target, background: '', opacity: '', text: 'Drag files here...' })
      }
    }
  }

  async function cleanUploads () {
    const notUploaded: Ref<UploadFileInterface[]> = ref([])
    for (let i = 0; i < files.value.length; i++) {
      console.log(`>>>> isUploaded value: ${files.value[i].isUploaded}`)
      if (!files.value[i].isUploaded) {
        notUploaded.value.push(files.value[i])
      }
    }
    setState(notUploaded.value)
    console.log('<<<<<< end cleanup')
    console.log(notUploaded.value)
  }

  async function performFileUpload ({ id, i }: { id: string; i: number }) {
    if (doesFileHaveInputErrors(files.value[i]) || httpErrors.value.imagescount) return false
    setUserCaption(i)
    const config = getUploadConfig(i)
    await sendFileToServer({ id, i, config })
    await loadGallery(id)
    return true
  }

  async function submitFiles (id: string) {
    for (let i = 0; i < files.value.length; i++) {
      console.log(`>>>> isUploaded value: ${files.value[i].isUploaded}`)
      if (!files.value[i].isUploaded) await performFileUpload({ id, i })
    }
  }

  function getFileErrorText (index: number): string {
    try {
      const f = files.value[index]
      const err = f.errors
      if (!err) return ''
      let result = getFileErrorString.httpresponse(err, f.progress)
      result += getFileErrorString.size(err)
      result += getFileErrorString.format(err)
      return result
    } catch (error) {
      return ''
    }
  }

  return { files, updateCaption, performFileUpload, submitFiles, addFilesFromInputFileList, getFileErrorText, dragEventHandler, removeFile, cleanUploads }
}
