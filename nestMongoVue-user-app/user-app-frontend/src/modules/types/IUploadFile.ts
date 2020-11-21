import { FileErrorsInterface } from '@/modules/types/IErors'

interface UploadFileInterface {
  data: File;
  errors: FileErrorsInterface;
  progress: number;
  caption: string;
  isUploaded?: boolean;
}

interface UpdatePictureInterface {
  image: string;
  imagecaption: string;
}

export {
  UploadFileInterface,
  UpdatePictureInterface
}
