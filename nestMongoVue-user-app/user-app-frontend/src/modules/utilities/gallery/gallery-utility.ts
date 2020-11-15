import { deleteUserImage, getUserImageString } from '@/modules/services'
import { to } from '@/modules/utilities/index-utility'
import { imageStringToBlobUrl, getImageType } from './converter'

async function getImageUrl (userId: string, image: string): Promise<string> {
  const [error, result] = await to(getUserImageString(userId, image))
  if (error) throw error
  return imageStringToBlobUrl(result.data, getImageType(image))
}

async function deleteOneImage (id: string, image: string): Promise<string[]> {
  const [error, result] = await to(deleteUserImage(id, image))
  if (error) throw error
  return result.data
}

function getGalleryLinkText (images: string[] | undefined, id: string): string {
  const length = images?.length
  return length ? `<a href="#/users/gallery/${id}">${length} image${length > 1 ? 's' : ''}</a>` : ''
}

export {
  deleteOneImage,
  getImageUrl,
  getGalleryLinkText
}
