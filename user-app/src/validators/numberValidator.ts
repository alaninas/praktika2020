// Should extend Errors and print the appropriate messaging
class NumberValidator {
    isPositiveInt(str: any) {
        return /^[+]?[0-9]+$/.test(str);
    }
    isFloat(str: any) {
        return /^[-+]?[0-9]+\.[0-9]+$/.test(str);
    }
    isBadNumber(inpNumber: any) {
        return (!inpNumber || Number.isNaN(inpNumber) || inpNumber < 0);
    }
    setNew(oldValue: number | undefined, newValue: number) {
        let result = 0;
        if (!oldValue) {
            if (!this.isBadNumber(newValue)) {
                if (this.isPositiveInt(newValue)) {
                    result = 1;
                } else {
                    throw new Error('Number not positive int');
                }
            } else {
                throw new Error('Number not positive int');
            }
        }
        return result;
    }
    updateOld(oldValue: number | undefined, newValue: number) {
        let result = 0;
        if (oldValue !== newValue) {
            if (!this.isBadNumber(newValue)) {
                if (this.isPositiveInt(newValue)) {
                    result = 1;
                } else {
                    throw new Error('Number not positive int');
                }
            } else {
                throw new Error('Number not positive int');
            }
        }
        return result;
    }
    public newAge({ oldValue, newValue }: { oldValue: number | undefined; newValue: number; }) {
        return this.setNew(oldValue,newValue);
    }
    public newHeight({ oldValue, newValue }: { oldValue: number | undefined; newValue: number; }) {
        return this.setNew(oldValue,newValue);
    }
    public updateAge({ oldValue, newValue }: { oldValue: number | undefined; newValue: number; }) {
        return this.updateOld(oldValue, newValue);
    }
    public updateHeight({ oldValue, newValue }: { oldValue: number | undefined; newValue: number; }) {
        return this.updateOld(oldValue, newValue);
    }
}
export default NumberValidator;