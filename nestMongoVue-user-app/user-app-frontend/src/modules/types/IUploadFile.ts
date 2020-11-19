import { FileErrorsInterface } from '@/modules/types/IErors'
// create UploadFiles interface:
//  data: File
//  errors: FileErrors /size, format, response/
//  progress: progress-percentage
//  caption: string

interface UploadFileInterface {
  data: File;
  errors: FileErrorsInterface;
  progress: number;
  caption: string;
  isUploaded?: boolean;
}

// interface ImagesPayloadInterface {
//   images: File;
//   imagecaption: string;
// }

export {
  UploadFileInterface
  // ImagesPayloadInterface
}
