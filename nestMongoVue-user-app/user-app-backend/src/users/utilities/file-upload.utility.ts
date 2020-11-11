import IFile from '../types/IFile';
import IImages from '../types/IImages';
import * as fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';

function prepareFileUpdate({ files, oldImages }: { files: IFile[]; oldImages: string[]; }): IImages {
  const response = oldImages;
  files.forEach((file: IFile) => {
    response.push(file.path);
  });
  return { images: response };
}

async function deleteOneImage(path): Promise<boolean> {
  try {
    fs.unlinkSync(path)
    //file removed
    return true
  } catch(err) {
    throw new HttpException(`Can not delete an image: ${path}`, HttpStatus.BAD_REQUEST);
  }
}

export {
  prepareFileUpdate,
  deleteOneImage
}