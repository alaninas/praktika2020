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
const fileErrors = ref([{} as FileErrorsInterface])
// TODO: move imagesscount to httpErr: it's a global upload error property set on the file upload batch as a whole
const httpErrors = ref({ email: '', password: '' } as HttpErrorsInterface)

export {
  UserErrorsInterface,
  HttpErrorsInterface,
  HttpErrorsFieldTypes,
  UserErrorsFieldTypes,
  validationErrors,
  userErrors,
  httpErrors
}
