/* eslint-disable no-useless-catch */
import { deleteUserImage } from '../services'
import { to } from '@/modules/utilities/index-utility'

async function deleteOneImage (id: string, image: string): Promise<string[]> {
  const [error, result] = await to(deleteUserImage(id, image))
  if (error) throw error
  return result.data
}

export {
  deleteOneImage
}
