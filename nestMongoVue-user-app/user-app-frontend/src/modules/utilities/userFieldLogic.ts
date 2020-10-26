import UserInterface from '@/modules/types/IUser'
import useUsersFunc from '@/modules/features/useUsers'

export async function isNameUnique (user: UserInterface): Promise<boolean> {
  const { usersBE } = await useUsersFunc()
  // console.log(usersBE.value)
  if (user.name === undefined || user.name.length === 0) return true
  return user.name.length > 0 && usersBE.value.data.findIndex(el => el.name?.toUpperCase() === user.name?.toUpperCase()) < 0
}

export async function arePassworsEqual (user: UserInterface): Promise<boolean> {
  // console.log(user.password)
  // console.log(user.passwordConfirm)
  // console.log(user.password === user.passwordConfirm)
  return user.password === user.passwordConfirm
}
