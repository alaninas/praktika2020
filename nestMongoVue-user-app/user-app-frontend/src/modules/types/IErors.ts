import { ref } from 'vue'

interface UserErrorsInterface {
  password: string;
  passwordConfirm: string;
}

interface HttpErrorsInterface {
  email: string;
  password: string;
}

const validationErrors = ref({})
const userErrors = ref({ password: '', passwordConfirm: '' } as UserErrorsInterface)
const httpErrors = ref({ email: '', password: '' } as HttpErrorsInterface)

export {
  UserErrorsInterface,
  HttpErrorsInterface,
  validationErrors,
  userErrors,
  httpErrors
}
