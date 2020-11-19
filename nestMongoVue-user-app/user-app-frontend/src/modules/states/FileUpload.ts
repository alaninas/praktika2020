import { Ref, ref } from 'vue'
import { UploadFileInterface } from '@/modules/types/IUploadFile'
import { putUserNewImages } from '../services'
import { to } from '../utilities/index-utility'
import { AxiosRequestConfig } from 'axios'
import { setEventTargetDisplay, setTargetStyleField } from '../utilities/fileUpload/targetSetters'

const files: Ref<UploadFileInterface[]> = ref([])

function getState (): Ref<UploadFileInterface[]> {
  return files
}

function addFilesFromInputFileList (inputImages: FileList) {
  for (let i = 0; i < inputImages.length; i++) {
    const f = inputImages[i]
    files.value.push({ data: f } as UploadFileInterface)
  }
}

function getFileErrorText (index: number): string {
  try {
    const f = files.value[index]
    const err = f.errors
    if (!err) return ''
    const length = err.httpresponse?.length
    return length ? ` Error: ${err.httpresponse}. Upload progress: ${f.progress}` : ''
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

function setCaption ({ i, imagecaption }: { i: number; imagecaption: string }) {
  files.value[i].caption = imagecaption
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
  const f = files.value[i]
  const formData = new FormData()
  formData.append('images', f.data)
  formData.append('imagecaption', f.caption)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, result] = await to(putUserNewImages({ formData, id, config }))
  if (error) {
    console.log(`----> Server error response: ${error.message}`)
    files.value[i].errors = { httpresponse: error.message }
  }
}

const dragEventHandler = {
  dragStart (event: DragEvent) {
    console.log('---> drag start')
    setTargetStyleField({ target: event.target, field: 'opacity', attr: '0.75' })
  },
  dragOver (event: DragEvent) {
    console.log('---> drag over')
    setEventTargetDisplay({ target: event.target, background: '#e64040', text: 'Drop new images here...' })
  },
  dragLeave (event: DragEvent) {
    console.log('---> drag leave')
    setEventTargetDisplay({ target: event.target, background: '', opacity: '', text: 'Drag files here...' })
  },
  drop (event: DragEvent) {
    console.log('---> drop')
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
  getUploadConfig,
  sendFileToServer,
  getState,
  dragEventHandler,
  files
}
