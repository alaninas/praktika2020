import User from '@/modules/User'
import Users from '@/modules/Users'
import { Ref } from 'vue'
import { compareNumbers, compareStrings } from '@/modules/CompareFunctions'

export default function useUsers (usersArray: Users) {
  // const users: Ref<User[]> = ref([
  //   new User({ name: 'a', age: 22, email: 'hhgh@gmail.com' }),
  //   new User({ name: 'ca', age: 33, email: 'a@gmail.com' }),
  //   new User({ name: 'AA', age: 44, email: 'AA@gmail.com' })
  // ])
  const users = usersArray.getUsersArrayRef()

  function getUsersArray (): User[] {
    return users.value
  }

  function getUsersArrayRef (): Ref<User[]> {
    return users
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

  // function displayType<T> (id: T, name: string): void {
  //   console.log(typeof (id) + ', ' + typeof (name))
  // }
  // displayType<number>(1, 'Steve')

  function usersSortByName (reverse: boolean): User[] {
    return users.value.sort((a, b) => compareStrings(a.name, b.name, reverse))
  }

  function usersSortByEmail (reverse: boolean): User[] {
    return users.value.sort((a, b) => compareStrings(a.email, b.email, reverse))
  }

  function usersSortByAge (reverse: boolean): User[] {
    return users.value.sort((a, b) => compareNumbers(a.age, b.age, reverse))
  }

  return { users, getUsersArray, getUsersArrayRef, isNameUnique, usersAdd, usersRemove, usersSearchByName, usersSortByName, usersSortByAge, usersSortByEmail }
}
