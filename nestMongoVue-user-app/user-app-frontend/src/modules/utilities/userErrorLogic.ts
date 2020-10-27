import UserInterface from '@/modules/types/IUser'
import useUsersFunc from '@/modules/features/useUsers'

export async function isEmailUnique (user: UserInterface): Promise<boolean> {
  const { usersBE } = await useUsersFunc()
  // console.log(usersBE.value)
  if (user.email === undefined || user.email.length === 0) return true
  return user.email.length > 0 && usersBE.value.data.findIndex(el => el.email?.toUpperCase() === user.email?.toUpperCase()) < 0
}

export async function arePassworsEqual (user: UserInterface): Promise<boolean> {
  return user.password === user.passwordConfirm
}
