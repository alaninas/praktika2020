import User from '@/modules/User'
import { Ref, ref } from 'vue'

export default function usersFactory () {
  const users: Ref<User[]> = ref([
    new User({ name: 'a', age: 22, email: 'hhgh@gmail.com' }),
    new User({ name: 'ca', age: 33, email: 'a@gmail.com' }),
    new User({ name: 'AA', age: 44, email: 'AA@gmail.com' })
  ])

  function getUsersArray (): User[] {
    return users.value
  }

  function isNameUnique (user: User): boolean {
    return user.name !== undefined && users.value.findIndex(el => el.name === user.name) < 0
  }

  function usersAdd (user: User): User[] {
    users.value.push(user)
    return users.value
  }

  function usersRemove (user: User): User[] {
    const index = users.value.findIndex(el => el.name === user.name)
    if (index > -1) users.value.splice(index, 1)
    return users.value
  }

  function usersSearchByName ({ pattern = '' }: { pattern?: string }): User[] {
    const re = new RegExp(pattern, 'i')
    return pattern ? users.value.filter(el => el.name && re.test(el.name)) : []
  }

  function usersSortByName ({ reverse = false }: { reverse?: boolean }): User[] {
    const aIsLower = reverse ? 1 : -1
    const aIsHigher = reverse ? -1 : 1
    users.value.sort((a, b) => a.name && b.name && a.name.toUpperCase() < b.name.toUpperCase() ? aIsLower : aIsHigher)
    return users.value
  }

  function usersSortByEmail ({ reverse = false }: { reverse?: boolean }): User[] {
    const aIsLower = reverse ? 1 : -1
    const aIsHigher = reverse ? -1 : 1
    users.value.sort((a, b) => a.email && b.email && a.email.toUpperCase() < b.email.toUpperCase() ? aIsLower : aIsHigher)
    return users.value
  }

  function usersSortByAge ({ reverse = false }: { reverse?: boolean }): User[] {
    const aIsLower = reverse ? 1 : -1
    const aIsHigher = reverse ? -1 : 1
    users.value.sort((a, b) => a.age && b.age && a.age < b.age ? aIsLower : aIsHigher)
    return users.value
  }
  return { users, getUsersArray, isNameUnique, usersAdd, usersRemove, usersSearchByName, usersSortByName, usersSortByAge, usersSortByEmail }
}
