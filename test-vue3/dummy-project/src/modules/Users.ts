import User from '@/modules/User'
import { Ref, ref } from 'vue'

export default class Users extends User {
    users: Ref<User[]>

    constructor ({
      myUsers = [
        new User({ name: 'a', age: 22, email: 'hhgh@gmail.com' }),
        new User({ name: 'ca', age: 33, email: 'a@gmail.com' }),
        new User({ name: 'AA', age: 44, email: 'AA@gmail.com' })
      ]
    }: { myUsers?: User[] }) {
      super({})
      this.users = ref(myUsers)
    }

    setUsers ({ myUsers = [] }: { myUsers?: User[] }): void {
      this.users = ref(myUsers)
    }

    getUsersArrayRef (): Ref<User[]> {
      return this.users
    }

    getUsers (): Users {
      return this
    }
}
