import UserInterface from '@/modules/types/IUser'

export async function arePassworsEqual (user: UserInterface): Promise<boolean> {
  console.log(`! passwords: ${user.password} ${user.passwordConfirm}`)
  return user.password === user.passwordConfirm
}
