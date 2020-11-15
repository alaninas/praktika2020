import { extname } from 'path';
import * as fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';
import IFile from '../types/IFile';

const imageFileFilter = (_req: any, file: IFile, callback: (arg0: HttpException, arg1: boolean) => void) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST), false);
  }
  callback(null, true);
};

const editFileName = (_req: any, file: IFile, callback: (arg0: any, arg1: string) => void) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

const editDestination = (req: { params: { id: string; }; }, _file: IFile, callback: (arg0: HttpException, arg1: string | boolean) => void) => {
  const path = `${process.env.MULTER_OPTIONS_DESTINATION}/${req.params.id}`;
  let stat = null;
  try {
    stat = fs.statSync(path);
  } catch (err) {
    fs.mkdirSync(path, { recursive: true });
  }
  if (stat && !stat.isDirectory()) {
    callback(new HttpException(`Directory cannot be created because an inode of a different type exists at: ${path}`, HttpStatus.INTERNAL_SERVER_ERROR), false);
  } 
  callback(null, path);
};

export {
  imageFileFilter,
  editFileName,
  editDestination
}