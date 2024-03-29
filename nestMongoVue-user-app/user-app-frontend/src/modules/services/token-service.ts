import TokenInterface from '@/modules/types/IToken'
import { AuthCredentialsType } from '@/modules/types/ILogin'

const TOKEN_KEY = 'accessToken'
const NAME_KEY = 'username'
const ID_KEY = 'userId'

const tokenService = {
  login (token: TokenInterface) {
    localStorage.setItem(TOKEN_KEY, token.access_token)
    localStorage.setItem(NAME_KEY, token.email)
    localStorage.setItem(ID_KEY, token.id)
  },
  logout () {
    if (!this.getAccessToken()) console.log('User Not logged in')
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(NAME_KEY)
    localStorage.removeItem(ID_KEY)
  },
  getUserId (): string | null {
    return localStorage.getItem(ID_KEY) || null
  },
  getUsername (): string | null {
    return localStorage.getItem(NAME_KEY) || null
  },
  getAccessToken (): string | null {
    return localStorage.getItem(TOKEN_KEY) || null
  },
  getAuthCredentials (): AuthCredentialsType {
    return { userId: this.getUserId() || '', isAuthenticated: !!this.getAccessToken(), accessToken: this.getAccessToken() || '' }
  }
}

export {
  tokenService,
  TokenInterface
}
