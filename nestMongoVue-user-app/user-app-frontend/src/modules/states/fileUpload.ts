import { Ref, ref } from 'vue'
import { UploadFileInterface } from '@/modules/types/IUploadFile'
import { putUserNewImages } from '../services'
import { to } from '../utilities/index-utility'
import { AxiosRequestConfig } from 'axios'
import { createFilesUploadFormData, fileCountLimit, isFileCountAcceptable } from '../utilities/fileUpload/fileupload-utility'
import { FileErrorsInterface } from '../types/IErors'
import { resetHttpErrors, setHttpErrorsField } from './formErrors'

const files: Ref<UploadFileInterface[]> = ref([])
const caption = ref('')
resetHttpErrors()

function setState (data: UploadFileInterface[]) {
  files.value = data
}

function setFileError ({ i, err }: { i: number; err: FileErrorsInterface }) {
  files.value[i].errors = err
}

function getState (): Ref<UploadFileInterface[]> {
  return files
}

function addFile (f: UploadFileInterface) {
  files.value.push(f)
}

function removeFile (index: number) {
  files.value.splice(index, 1)
  const imcount = files.value.length
  setHttpErrorsField({ field: 'imagescount', message: isFileCountAcceptable(imcount) ? '' : `Images count: ${imcount} exceeds the current limit ${fileCountLimit}.` })
}

function setDefaultCaption (newVal: string) {
  caption.value = newVal
}

function setUserCaption (i: number) {
  files.value[i].caption = caption.value
}

function setProgress ({ i, progress }: { i: number; progress: number }) {
  files.value[i].progress = progress
}

function createUploadConfig (i: number): AxiosRequestConfig {
  const config: AxiosRequestConfig = {
    onUploadProgress: (progressEvent) => {
      setProgress({ i, progress: Math.round((progressEvent.loaded * 100) / progressEvent.total) })
    }
  }
  return config
}

async function sendFileToServer ({ id, i, config }: { id: string; i: number; config: AxiosRequestConfig }) {
  const formData = createFilesUploadFormData({ inputImage: files.value[i].data, caption: files.value[i].caption })
  const [error, result] = await to(putUserNewImages({ formData, id, config }))
  if (error) {
    setFileError({ i, err: { httpresponse: error.message } })
    files.value[i].isUploaded = false
  }
  if (result) files.value[i].isUploaded = true
}

export {
  removeFile,
  setDefaultCaption,
  setUserCaption,
  createUploadConfig,
  sendFileToServer,
  getState,
  setState,
  addFile,
  files
}
