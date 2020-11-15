const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512): Blob => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

const getImageType = (image: string): string | undefined => {
  return image.split('.').pop()
}

function imageStringToBlobUrl (b64Data: string, type: string | undefined): string {
  const contentType = 'image/' + (type || 'jpg')
  const blob = b64toBlob(b64Data, contentType)
  return URL.createObjectURL(blob)
}

export {
  imageStringToBlobUrl,
  getImageType
}
