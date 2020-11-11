import IFile from '../types/IFile';
import IImages from '../types/IImages';

function prepareFileUpdate({ files, oldFiles }: { files: IFile[]; oldFiles: string[]; }): IImages {
  const response = oldFiles;
  files.forEach((file: IFile) => {
    response.push(file.path);
  });
  return { images: response };
}

export {
  prepareFileUpdate
}