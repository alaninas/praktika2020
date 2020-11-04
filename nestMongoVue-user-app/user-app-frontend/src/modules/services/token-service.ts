interface TokenInterface {
  access_token: string;
  email: string;
}

const TOKEN_KEY = 'accessToken'
const NAME_KEY = 'username'

const tokenService = {
  login (token: TokenInterface) {
    localStorage.setItem(TOKEN_KEY, token.access_token)
    localStorage.setItem(NAME_KEY, token.email)
  },
  logout () {
    if (!this.isLoggedIn()) throw new Error('Not logged in')
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(NAME_KEY)
  },
  getUsername (): string | null {
    return localStorage.getItem(NAME_KEY) || null
  },
  getAccessToken (): string | null {
    return localStorage.getItem(TOKEN_KEY) || null
  },
  isLoggedIn (): boolean {
    return !!this.getAccessToken()
  }
}

export {
  tokenService,
  TokenInterface
}
