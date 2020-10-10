import User from '@/modules/User'
import { Ref, ref } from 'vue'

// export function createSingleUser (user: User): User {
//   const newUser = new User({ name: user.name, age: user.age, email: user.email })
//   return newUser
// }

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

export function usersSearchByName ({ users, pattern }: { users: User[]; pattern: string }): User[] {
  const re = new RegExp(pattern, 'i')
  return users.filter(el => el.name && re.test(el.name))
}

export function usersSortByName ({ users, reverse = false }: { users: User[]; reverse?: boolean }): User[] {
  const aIsLower = reverse ? 1 : -1
  const aIsHigher = reverse ? -1 : 1
  users.sort((a, b) => a.name && b.name && a.name.toUpperCase() < b.name.toUpperCase() ? aIsLower : aIsHigher)
  return users
}

export function usersSortByEmail ({ users, reverse = false }: { users: User[]; reverse?: boolean }): User[] {
  const aIsLower = reverse ? 1 : -1
  const aIsHigher = reverse ? -1 : 1
  users.sort((a, b) => a.email && b.email && a.email.toUpperCase() < b.email.toUpperCase() ? aIsLower : aIsHigher)
  return users
}

export function usersSortByAge ({ users, reverse = false }: { users: User[]; reverse?: boolean }): User[] {
  const aIsLower = reverse ? 1 : -1
  const aIsHigher = reverse ? -1 : 1
  users.sort((a, b) => a.age && b.age && a.age < b.age ? aIsLower : aIsHigher)
  return users
}
