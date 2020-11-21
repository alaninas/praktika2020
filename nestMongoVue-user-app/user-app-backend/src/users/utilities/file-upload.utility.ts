import IFile from '../types/IFile';
import IImages from '../types/IImages';
import * as fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Person } from '../schemas/user.schema';
import { ObjectID } from 'mongodb';
import IImage from '../types/IImage';

function getUpdatedUserImages({ file, caption, oldImages }: { file: string; oldImages: IImage[]; caption: string; }): IImages {
  const response = oldImages;
  const i = response.findIndex(el => el.filename === file)
  response[i].caption = caption
  return { images: response };
}

function getAugmentedUserImages({ files, caption, oldImages }: { files: IFile[]; oldImages: IImage[]; caption: string; }): IImages {
  const response = oldImages;
  files.forEach((file: IFile) => {
    response.push({ filename: file.filename, caption });
  });
  return { images: response };
}

function readFile (id: ObjectID, image: string): string {
  try {
    return fs.readFileSync(`uploads/${id}/${image}`, 'base64')
  } catch (err) {
    throw new HttpException(`Can not read image: ${id}/${image}`, HttpStatus.NOT_FOUND);
  }
}


async function deleteOneImage(user: Person, image: string): Promise<IImage[] | undefined> {
  const oldImages = user.images
  try {
    fs.unlinkSync(`${process.env.MULTER_OPTIONS_DESTINATION}/${user._id}/${image}`)
    //file removed
    const index = oldImages.findIndex(el => el.filename === image)
    oldImages.splice(index, 1)
    return !!oldImages ? oldImages : [] 
  } catch(err) {
    throw new HttpException(`Can not delete an image: ${user._id}/${image}`, HttpStatus.BAD_REQUEST);
  }
}

export {
  getAugmentedUserImages,
  deleteOneImage,
  readFile,
  getUpdatedUserImages
}