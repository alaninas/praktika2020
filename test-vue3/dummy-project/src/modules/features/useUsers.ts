import UserInterface from '@/modules/types/IUser'
import { compareNumbers, compareStrings } from '@/modules/utilities/compareFunctions'
import { ref, Ref } from 'vue'

export const users: Ref<UserInterface[]> = ref([
  { userName: 'a', age: 22, email: 'hg@gmail.com', addressString: 'Vivulskio g., 123, Vilnius, 70546', country: 'Lietuva' } as UserInterface,
  { userName: 'ca', age: 33, email: 'aacc@gmail.com', addressString: 'Algirdo g., 33, Vilnius, 00546', country: 'Lietuva' } as UserInterface,
  { userName: 'AA', age: 44, email: 'AA@gmail.com', addressString: 'Vieversiu g., 123, Vilnius, 10546', country: 'Lietuva' } as UserInterface
])

export default function useUsers () {
  function usersRemove (user: UserInterface): UserInterface[] {
    const index = users.value.findIndex(el => el.userName === user.userName)
    if (index > -1) users.value.splice(index, 1)
    return users.value
  }

  function searchByName ({ pattern = '' }: { pattern?: string }): UserInterface[] {
    const re = new RegExp(pattern, 'i')
    return pattern ? users.value.filter(el => el.userName && re.test(el.userName)) : []
  }

  function sortByUserName (reverse: boolean): UserInterface[] {
    return users.value.sort((a, b) => compareStrings(a.userName, b.userName, reverse))
  }

  function sortByEmail (reverse: boolean): UserInterface[] {
    return users.value.sort((a, b) => compareStrings(a.email, b.email, reverse))
  }

  function sortByCountry (reverse: boolean): UserInterface[] {
    return users.value.sort((a, b) => compareStrings(a.country, b.country, reverse))
  }

  function sortByAddressString (reverse: boolean): UserInterface[] {
    return users.value.sort((a, b) => compareStrings(a.addressString, b.addressString, reverse))
  }

  function sortByAge (reverse: boolean): UserInterface[] {
    return users.value.sort((a, b) => compareNumbers(a.age, b.age, reverse))
  }
  return { users, usersRemove, searchByName, sortByUserName, sortByAge, sortByEmail, sortByAddressString, sortByCountry }
}
