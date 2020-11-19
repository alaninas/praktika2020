import { Ref, ref } from 'vue'
import { UploadFileInterface } from '@/modules/types/IUploadFile'
import { putUserNewImages } from '../services'
import { to } from '../utilities/index-utility'
import { AxiosRequestConfig } from 'axios'
import { setEventTargetDisplay, setTargetStyleField } from '../utilities/fileUpload/targetSetters'

const files: Ref<UploadFileInterface[]> = ref([])
const caption = ref('')

function getState (): Ref<UploadFileInterface[]> {
  return files
}

function addFilesFromInputFileList (inputImages: FileList) {
  for (let i = 0; i < inputImages.length; i++) {
    const f = inputImages[i]
    files.value.push({ data: f } as UploadFileInterface)
    // >>>>> here set errors.....
    // files.value[i].errors = { size: error.message }
    // files.value[i].errors = { format: error.message }
  }
}

function getFileErrorText (index: number): string {
  try {
    const f = files.value[index]
    const err = f.errors
    if (!err) return ''
    const length = err.httpresponse?.length
    return length ? `Error: ${err.httpresponse}. Upload progress: ${f.progress}` : ''
  } catch (error) {
    return ''
  }
}

function removeFile (index: number) {
  console.log('removes files from form')
  files.value.splice(index, 1)
  console.log('-- updated files array')
  console.log(files.value)
}

function setCaption (newVal: string) {
  caption.value = newVal
  console.log(`>>>> new caption: ${caption.value}`)
}

function setUserCaption (i: number) {
  files.value[i].caption = caption.value
}

function setProgress ({ i, progress }: { i: number; progress: number }) {
  files.value[i].progress = progress
}

function getUploadConfig (i: number): AxiosRequestConfig {
  const config: AxiosRequestConfig = {
    onUploadProgress: (progressEvent) => {
      setProgress({ i, progress: Math.round((progressEvent.loaded * 100) / progressEvent.total) })
    }
  }
  return config
}

async function sendFileToServer ({ id, i, config }: { id: string; i: number; config: AxiosRequestConfig }) {
  console.log(`--> submits files to server userId: ${id}`)
  console.log(`--> file: ${files.value[i].data.name}`)
  console.log(`--> caption: ${files.value[i].caption}`)
  const f = files.value[i]
  const formData = new FormData()
  formData.append('images', f.data)
  formData.append('imagecaption', f.caption)
  const [error, result] = await to(putUserNewImages({ formData, id, config }))
  if (error) {
    console.log(`----> Server error response: ${error.message}`)
    files.value[i].errors = { httpresponse: error.message }
    files.value[i].isUploaded = false
  }
  if (result) files.value[i].isUploaded = true
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

export {
  addFilesFromInputFileList,
  getFileErrorText,
  removeFile,
  setCaption,
  setUserCaption,
  getUploadConfig,
  sendFileToServer,
  getState,
  dragEventHandler,
  files
}
