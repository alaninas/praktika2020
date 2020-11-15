import IFile from '../types/IFile';
import IImages from '../types/IImages';
import * as fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Person } from '../schemas/user.schema';
import { ObjectID } from 'mongodb';

function addUserFiles({ files, oldImages }: { files: IFile[]; oldImages: string[]; }): IImages {
  const response = oldImages;
  files.forEach((file: IFile) => {
    response.push(file.filename);
  });
  return { images: response };
}

function readImageFile (id: ObjectID, image: string): string {
  try {
    return fs.readFileSync(`uploads/${id}/${image}`, 'base64')
  } catch (err) {
    throw new HttpException(`Can not read image: ${id}/${image}`, HttpStatus.NOT_FOUND);
  }
}


async function deleteOneImage(user: Person, image: string): Promise<string[] | undefined> {
  const oldImages = user.images
  try {
    fs.unlinkSync(`${process.env.MULTER_OPTIONS_DESTINATION}/${user._id}/${image}`)
    //file removed
    console.log('images before splice')
    console.log(oldImages)
    const index = oldImages.findIndex(el => el === image)
    oldImages.splice(index, 1)
    console.log('after splice')
    console.log(oldImages)
    return !!oldImages ? oldImages : [] 
  } catch(err) {
    throw new HttpException(`Can not delete an image: ${user._id}/${image}`, HttpStatus.BAD_REQUEST);
  }
}

export {
  addUserFiles,
  deleteOneImage,
  readImageFile
}