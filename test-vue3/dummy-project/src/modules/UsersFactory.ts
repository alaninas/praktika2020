import User from '@/modules/User'
import { Ref, ref } from 'vue'

export function createSingleUser (user: User): User {
  const newUser = new User({ name: user.name, age: user.age, email: user.email })
  return newUser
}

export function createUsersArray (myUsers: User[] | []): User[] {
  const users: Ref<User[]> = ref([])
  users.value = myUsers
  return users.value
}

export function isNameUnique (users: User[], user: string): boolean {
//   alert(users.findIndex(el => el.name === user))
  return users.findIndex(el => el.name === user) < 0
}

export function usersAdd (users: User[], user: User): User[] {
  users.push(user)
  return users
}

export function usersRemove (users: User[], user: User): User[] {
  const index = users.findIndex(el => el.name === user.name)
  if (index > -1) users.splice(index, 1)
  return users
}

export function usersSearchByName (users: User[], pattern: string): User[] {
  const re = new RegExp(pattern, 'i')
  return users.filter(el => el.name && re.test(el.name))
}
