import UserInterface from '@/modules/types/IUser'
// import { useUsers } from '@/modules/features/useUsers'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function isEmailUnique (user: UserInterface): Promise<boolean> {
  // const { getUsers } = await useUsers()
  // const usersBE = await getUsers()
  // // console.log(usersBE.value)
  // if (user.email === undefined || user.email.length === 0) return true
  // return user.email.length > 0 && usersBE.findIndex(el => el.email?.toUpperCase() === user.email?.toUpperCase()) < 0
  return true
}

export async function arePassworsEqual (user: UserInterface): Promise<boolean> {
  return user.password === user.passwordConfirm
}
