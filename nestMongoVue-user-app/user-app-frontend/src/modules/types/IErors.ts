import { ref } from 'vue'

interface UserErrorsInterface {
  password: string;
  passwordConfirm: string;
  age?: string;
}

interface HttpErrorsInterface {
  email: string;
  password: string;
  image: string;
}

const validationErrors = ref({})
const userErrors = ref({ password: '', passwordConfirm: '' } as UserErrorsInterface)
const httpErrors = ref({ email: '', password: '', image: '' } as HttpErrorsInterface)

export {
  UserErrorsInterface,
  HttpErrorsInterface,
  validationErrors,
  userErrors,
  httpErrors
}
