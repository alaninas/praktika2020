import UserInterface from '@/modules/IUser'

export default class User implements UserInterface {
    name: string;
    age: number | undefined;
    email: string | undefined;

    constructor ({ name, age, email }: { name: string; age?: number; email?: string }) {
      this.name = name
      this.age = age
      this.email = email
    }
}
