interface TokenInterface {
  access_token: string;
}

const TOKEN_KEY = 'accessToken'

const tokenService = {
  login (token: TokenInterface) {
    localStorage.setItem(TOKEN_KEY, token.access_token)
  },
  logout () {
    if (!this.isLoggedIn()) throw new Error('Not logged in')
    localStorage.removeItem(TOKEN_KEY)
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
