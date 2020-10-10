import User from '@/modules/User'
import { Ref, ref } from 'vue'

export function createUsersArrayRef (myUsers: User[] | []): User[] {
  const users: Ref<User[]> = ref([])
  users.value = myUsers
  return users.value
}

export function isNameUnique ({ users, user }: { users: User[]; user: User }): boolean {
  return user.name !== undefined && users.findIndex(el => el.name === user.name) < 0
}

export function usersAdd ({ users, user }: { users: User[]; user: User }): User[] {
  users.push(user)
  return users
}

export function usersRemove ({ users, user }: { users: User[]; user: User }): User[] {
  const index = users.findIndex(el => el.name === user.name)
  if (index > -1) users.splice(index, 1)
  return users
}

export function usersSearchByName ({ users, pattern = '' }: { users: User[]; pattern?: string }): User[] {
  const re = new RegExp(pattern, 'i')
  return pattern ? users.filter(el => el.name && re.test(el.name)) : []
}
