import UserInterface from '@/modules/types/IUser'
import { users } from '@/modules/features/useUsers'

export function isNameUnique (user: UserInterface): boolean {
  if (user.userName === undefined || user.userName.length === 0) return true
  return user.userName.length > 0 && users.value.findIndex(el => el.userName === user.userName) < 0
}

export function arePassworsEqual (user: UserInterface): boolean {
  return user.password === user.passwordConfirm
}
