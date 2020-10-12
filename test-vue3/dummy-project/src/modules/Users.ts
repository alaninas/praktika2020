import User from '@/modules/User'
import { Ref, ref } from 'vue'

export default class Users extends User {
    private static users: Ref<User[]> = ref([
      new User({ name: 'a', age: 22, email: 'hhgh@gmail.com' }),
      new User({ name: 'ca', age: 33, email: 'a@gmail.com' }),
      new User({ name: 'AA', age: 44, email: 'AA@gmail.com' })
    ])

    setUsers ({ myUsers = [] }: { myUsers?: User[] }): void {
      Users.users = ref(myUsers)
    }

    getUsersArrayRef (): Ref<User[]> {
      return Users.users
    }

    getUsers (): Users {
      return this
    }
}
