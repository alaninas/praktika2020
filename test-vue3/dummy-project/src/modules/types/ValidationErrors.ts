export default class ValidationErrors {
    isValid: boolean;
    messages: string[];

    constructor ({ isValid = true, messages = [] }: { isValid?: boolean; messages?: string[] }) {
      this.isValid = isValid
      this.messages = messages
    }

    getIsValid (): boolean {
      return this.isValid
    }

    getMessage (): string[] {
      return this.messages
    }

    setErrors ({ isValid = true, messages = [] }: { isValid?: boolean; messages?: string[] }): void {
      // const { ...errors } = this
      this.isValid = isValid
      messages.forEach(element => {
        this.messages.push(element)
      })
    }
}
