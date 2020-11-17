import { ref } from 'vue'

interface UserErrorsInterface {
  password: string;
  passwordConfirm: string;
  age?: string;
}

interface FilesErrorsInterface {
  format: string;
  size: string;
  count: string;
}

interface HttpErrorsInterface {
  email: string;
  password: string;
  image?: string;
}

type UserErrorsFieldTypes = 'password' | 'passwordConfirm' | 'age'
type FilesErrorsFieldTypes = 'format' | 'size' | 'count'
type HttpErrorsFieldTypes = 'email' | 'password' | 'image'

const validationErrors = ref({})
const userErrors = ref({ password: '', passwordConfirm: '' } as UserErrorsInterface)
const filesErrors = ref({ format: '', size: '', count: '' } as FilesErrorsInterface)
const httpErrors = ref({ email: '', password: '', image: '' } as HttpErrorsInterface)

export {
  UserErrorsInterface,
  HttpErrorsInterface,
  HttpErrorsFieldTypes,
  UserErrorsFieldTypes,
  validationErrors,
  userErrors,
  httpErrors
}
