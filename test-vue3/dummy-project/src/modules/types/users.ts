import User from '@/modules/types/User'
import { Ref, ref } from 'vue'

export const users: Ref<User[]> = ref([
  new User({ name: 'a', age: 22, email: 'hhgh@gmail.com' }),
  new User({ name: 'ca', age: 33, email: 'a@gmail.com' }),
  new User({ name: 'AA', age: 44, email: 'AA@gmail.com' })
])

// export function getUsersArrayRef (): Ref<User[]> {
//   return users
// }
