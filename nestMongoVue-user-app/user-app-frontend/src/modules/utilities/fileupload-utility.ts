const acceptedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']

const sizeLimit = 1000

const fileCountLimit = 20

function isFormatAcceptable (type: string) {
  return acceptedFormats.indexOf(type) > -1
}

function isSizeAcceptable (size: number) {
  return size <= sizeLimit
}

function isFileCountAcceptable (count: number) {
  return count <= fileCountLimit
}

export {
  isFormatAcceptable,
  isSizeAcceptable,
  isFileCountAcceptable
}
