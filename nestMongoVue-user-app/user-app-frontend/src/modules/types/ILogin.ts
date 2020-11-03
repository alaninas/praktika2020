import { ref } from 'vue'

export default interface LoginInterface {
  password: string;
  email: string;
  _id: string;
}

export const loginData = ref({ password: '', email: '', _id: '' } as LoginInterface)
