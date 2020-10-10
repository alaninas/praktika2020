import UserInterface from '@/modules/IUser'
import ValidationErrors from '@/modules/ValidationErrors'

export default class User implements UserInterface {
    name?: string;
    age?: number;
    email?: string;
    validate: ValidationErrors = new ValidationErrors({});

    constructor ({ name, age, email }: { name?: string; age?: number; email?: string }) {
      this.name = name
      this.age = age
      this.email = email
      this.validate = this.validateData({ name, age, email })
    }

    setUser ({ name, age, email }: { name: string; age?: number; email?: string }): void {
      this.name = name
      this.age = age
      this.email = email
      this.validate = this.validateData({ name, age, email })
    }

    getUser (): User {
      return this
    }

    getUserValidate (): ValidationErrors {
      return this.validate
    }

    validateData ({ name, age, email }: { name?: string; age?: number; email?: string }): ValidationErrors {
      if (!name) this.validate.setErrors({ isValid: false, messages: ['Name required.'] })
      if (!email) this.validate.setErrors({ isValid: false, messages: ['Email required.'] })
      if (age && (age < 18 || age > 99)) this.validate.setErrors({ isValid: false, messages: ['User age is not in range 18 to 99.'] })
      return this.validate
    }
}
