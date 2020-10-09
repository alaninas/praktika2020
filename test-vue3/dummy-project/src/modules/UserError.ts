import ErrorInterface from '@/modules/IError'
import User from '@/modules/User'

export default class UserError implements ErrorInterface {
    isPresent: boolean | undefined;
    message: string[];

    constructor ({ isPresent = false, message = [''] }: { isPresent: boolean | undefined; message?: string[] }) {
      this.isPresent = isPresent
      this.message = message
    }

    unsetErrors () {
      const { ...errors } = this
      errors.isPresent = false
      errors.message = []
      return errors
    }

    validateForm (user: User, indexOfDuplicate: number) {
      const errors = this.unsetErrors()
      if (user.name && user.age && indexOfDuplicate < 0) return errors
      if (!user.name) errors.message.push('Name required.')
      if (!user.age) errors.message.push('Age required.')
      if (indexOfDuplicate > -1) errors.message.push('User name already taken.')
      if (user.age && (user.age < 18 || user.age > 99)) errors.message.push('User age is not in range 18 to 99')
      errors.isPresent = true
      return errors
    }
}
