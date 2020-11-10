import { ref } from 'vue'
import { tokenService } from '@/modules/services/token-service'

interface LoginInterface {
  password: string;
  email: string;
  _id: string;
}

type AuthCredentialsType = { userId: string; isAuthenticated: boolean; accessToken: string | null }

const loginData = ref({ password: '', email: tokenService.getUsername() || '', _id: tokenService.getUserId() || '' } as LoginInterface)
const authCredentials = ref(tokenService.getAuthCredentials())

export {
  LoginInterface,
  AuthCredentialsType,
  loginData,
  authCredentials
}
