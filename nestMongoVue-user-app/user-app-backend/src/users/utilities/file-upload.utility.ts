import { extname } from 'path';
import IFile from '../types/IFile';
import * as fs from 'fs';

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

const editFullPath = (req, file, callback) => {
  const name = file.path;
  callback(null, `${name}`);
};

const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

const editDestination = (req, file, callback) => {
  const userId = req.params.iid
  // const userId = req.body.id <-- NOT WORKING, empty object
  const path = `./uploads/${userId}`;
  let stat = null;
  try {
      stat = fs.statSync(path);
  } catch (err) {
      fs.mkdirSync(path, { recursive: true });
  }
  if (stat && !stat.isDirectory()) {
      callback(new Error(`Directory cannot be created because an inode of a different type exists at: ${path}`));
  } 
  callback(null, path);
};

function prepareFileUpdate({ files, oldFiles }: { files: IFile[]; oldFiles: string[]; }): { images: string[] } {
  const response = oldFiles;
  files.forEach((file: IFile) => {
    response.push(file.path);
  });
  return { images: response };
}

export {
  imageFileFilter,
  editFullPath,
  editFileName,
  editDestination,
  prepareFileUpdate
}