import { FileErrorsInterface } from '@/modules/types/IErors'
import { UploadFileInterface } from '@/modules/types/IUploadFile'

const acceptedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
// const acceptedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'text/plain']

const sizeLimit = 1

const fileCountLimit = 3
// const fileCountLimit = 20

const converter = {
  roundNumber (num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100
  },
  toMB (num: number): number {
    return num / 1000000
  },
  toPrettyMB (num: number): number {
    return this.roundNumber(this.toMB(num))
  }
}

const getFileErrorString = {
  httpresponse (err: FileErrorsInterface, progress: number): string {
    const length = err.httpresponse?.length
    return length ? ` Response: ${err.httpresponse}. Upload progress: ${progress}` : ''
  },
  size (err: FileErrorsInterface): string {
    const length = err.size?.length
    return length ? ` File size: ${err.size}` : ''
  },
  format (err: FileErrorsInterface): string {
    const length = err.format?.length
    return length ? ` File format: ${err.format}` : ''
  }
}

function isFormatAcceptable (type: string) {
  return acceptedFormats.indexOf(type) > -1
}

function isSizeAcceptable (size: number) {
  return size <= sizeLimit
}

function isFileCountAcceptable (count: number) {
  return count <= fileCountLimit
}

function createFilesUploadFormData ({ inputImage, caption }: { inputImage: File; caption: string }): FormData {
  const formData = new FormData()
  formData.append('images', inputImage)
  formData.append('imagecaption', caption)
  return formData
}

function createFileInputErrors (file: File): FileErrorsInterface {
  const convSize = converter.toPrettyMB(file.size)
  const errors: FileErrorsInterface = { format: '', size: '' } as FileErrorsInterface
  if (!isSizeAcceptable(convSize)) errors.size = `${convSize}MB exceeds the limit ${sizeLimit}MB.`
  if (!isFormatAcceptable(file.type)) errors.format = `${file.type} is not supported. Currently supporting: ${acceptedFormats.toString()}.`
  return errors
}

function doesFileHaveInputErrors (file: UploadFileInterface): boolean {
  return !!(file.errors && (file.errors.size || file.errors.format))
}

export {
  isFormatAcceptable,
  isSizeAcceptable,
  isFileCountAcceptable,
  createFilesUploadFormData,
  createFileInputErrors,
  doesFileHaveInputErrors,
  fileCountLimit,
  getFileErrorString
}
