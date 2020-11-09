export default interface LoginInterface {
  password: string;
  email: string;
  _id: string;
}

export type authCredentialsType = { userId: string; isAuthenticated: boolean; accessToken: string | null }
