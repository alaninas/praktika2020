import UserInterface from '@/modules/IUser'
import ValidationErrors from '@/modules/ValidationErrors'

export default class User implements UserInterface {
    name?: string;
    age?: number;
    email?: string;
    validationErrors: ValidationErrors = new ValidationErrors({});

    constructor ({ name, age, email }: { name?: string; age?: number; email?: string }) {
      this.name = name
      this.age = age
      this.email = email
      this.validationErrors = this.validateData({ name, age, email })
    }

    setUser ({ name, age, email }: { name: string; age?: number; email?: string }): void {
      this.name = name
      this.age = age
      this.email = email
      this.validationErrors = this.validateData({ name, age, email })
    }

    getUser (): User {
      return this
    }

    getUserValidate (): ValidationErrors {
      return this.validationErrors
    }

    validateData ({ name, age, email }: { name?: string; age?: number; email?: string }): ValidationErrors {
      if (!name) this.validationErrors.setErrors({ isValid: false, messages: ['Name required.'] })
      if (!email) this.validationErrors.setErrors({ isValid: false, messages: ['Email required.'] })
      if (age && (age < 18 || age > 99)) this.validationErrors.setErrors({ isValid: false, messages: ['User age is not in range 18 to 99.'] })
      return this.validationErrors
    }

  // function displayType<T> (id: T, name: string): void {
  //   console.log(typeof (id) + ', ' + typeof (name))
  // }
  // displayType<number>(1, 'Steve')
}
