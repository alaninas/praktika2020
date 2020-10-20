import UserInterface from '@/modules/types/IUser'
import { Ref, ref } from 'vue'

export const users: Ref<UserInterface[]> = ref([
  { name: 'a', age: 22, email: 'hhgh@gmail.com' } as UserInterface,
  { name: 'ca', age: 33, email: 'a@gmail.com' } as UserInterface,
  { name: 'AA', age: 44, email: 'AA@gmail.com' } as UserInterface
])

// export function getUsersArrayRef (): Ref<User[]> {
//   return users
// }
