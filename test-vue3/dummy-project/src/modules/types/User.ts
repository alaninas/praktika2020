import UserInterface from '@/modules/types/IUser'
import ValidationErrors from '@/modules/types/ValidationErrors'

export default class User implements UserInterface {
    name?: string;
    surname?: string;
    age?: number;
    city?: string;
    country?: string;
    zipcode?: number;
    email?: string;
    url?: string;
    password?: string;
    passwordConfirm?: string;
    validationErrors: ValidationErrors = new ValidationErrors({});

    constructor ({ name, age, email }: { name?: string; age?: number; email?: string }) {
      this.setUser({ name, age, email })
    }

    setUser ({ name, age, email }: { name?: string; age?: number; email?: string }): void {
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

    arrayToString<T> (items: T[]): string {
      return items.join(', ')
    }

    validateData ({ name, age, email }: { name?: string; age?: number; email?: string }): ValidationErrors {
      if (!name) this.validationErrors.setErrors({ isValid: false, messages: ['Name required.'] })
      if (!email) this.validationErrors.setErrors({ isValid: false, messages: ['Email required.'] })
      if (age && (age < 18 || age > 99)) this.validationErrors.setErrors({ isValid: false, messages: ['User age is not in range 18 to 99.'] })
      return this.validationErrors
    }
}
