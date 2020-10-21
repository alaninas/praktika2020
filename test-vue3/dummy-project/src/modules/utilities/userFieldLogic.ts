import UserInterface from '@/modules/types/IUser'
import { users } from '@/modules/features/useUsers'

export function isNameUnique (user: UserInterface): boolean {
  if (user.name === undefined || user.name.length === 0) return true
  return user.name.length > 0 && users.value.findIndex(el => el.name === user.name) < 0
}

export function arePassworsEqual (user: UserInterface): boolean {
  return user.password === user.passwordConfirm
}
