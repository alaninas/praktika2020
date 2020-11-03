import { ref } from 'vue'

export default interface PasswordInterface {
  password: string;
  passwordConfirm: string;
}

export const pass = ref({ password: '', passwordConfirm: '' } as PasswordInterface)
