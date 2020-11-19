import { ref } from 'vue'

interface UserErrorsInterface {
  password: string;
  passwordConfirm: string;
  age?: string;
}

interface FileErrorsInterface {
  format?: string;
  size?: string;
  httpresponse?: string;
}

interface HttpErrorsInterface {
  email: string;
  password: string;
  imagesresponse?: string;
  imagescount?: string;
}

type UserErrorsFieldTypes = 'password' | 'passwordConfirm' | 'age'
type FileErrorsFieldTypes = 'format' | 'size' | 'httpresponse'
type HttpErrorsFieldTypes = 'email' | 'password' | 'imagesresponse' | 'imagescount'

const validationErrors = ref({})
const userErrors = ref({ password: '', passwordConfirm: '' } as UserErrorsInterface)
const httpErrors = ref({ email: '', password: '' } as HttpErrorsInterface)

export {
  UserErrorsInterface,
  HttpErrorsInterface,
  FileErrorsInterface,
  HttpErrorsFieldTypes,
  UserErrorsFieldTypes,
  FileErrorsFieldTypes,
  validationErrors,
  userErrors,
  httpErrors
}
