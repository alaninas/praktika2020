class NumberValidator {
    isPositiveInt(str: any) {
        return /^[+]?[0-9]+$/.test(str);
    }
    isFloat(str: any) {
        return /^[-+]?[0-9]+\.[0-9]+$/.test(str);
    }
    isAllDigits(str: any) {
        return /^[0-9]+$/.test(str);
    }
    isBadNumber(inpNumber: any) {
        return (!inpNumber || Number.isNaN(inpNumber) || inpNumber < 0);
    }
    public newAge({ oldValue, newValue }: { oldValue: number | undefined; newValue: number; }) {
        let result = 0;
        if (!oldValue) {
            if (newValue > 0) {
                result = 1;
            }
        }
        return result;
    }
    public updateAge({ oldValue, newValue }: { oldValue: number | undefined; newValue: number; }) {
        let result = 0;
        if (oldValue !== newValue) {
            if (newValue > 0) {
                result = 1;
            }
        }
        return result;
    }
    public newHeight({ oldValue, newValue }: { oldValue: number | undefined; newValue: number; }) {
        let result = 0;
        if (!oldValue) {
            if (newValue > 0) {
                result = 1;
            }
        }
        return result;
    }
    public updateHeight({ oldValue, newValue }: { oldValue: number | undefined; newValue: number; }) {
        let result = 0;
        if (oldValue !== newValue) {
            if (newValue > 0) {
                result = 1;
            }
        }
        return result;
    }
}
export default NumberValidator;