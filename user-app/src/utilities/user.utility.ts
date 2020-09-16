import PatternUtility from './pattern.utility';

class UserUtility extends PatternUtility {
    // TODO: add additional parameter -- property Error object (possibly can be managed in the child functions)
    validateNumeric(oldValue: number | undefined, newValue: number) {
        let result = 0;
        if (oldValue !== newValue) {
            if (!this.isBadNumber(newValue)) {
                result = 1;
            } else {
                throw new Error('Number not positive int');
            }
        } else {
            throw new Error('New value duplicates the old');
        }
        return result;
    }
    // tslint:disable-next-line: ban-types
    validateString(oldValue: string | String | undefined, newValue: string) {
        let result = 0;
        if (oldValue !== newValue) {
            if (!this.isEmpty(newValue)) {
                result = 1;
            } else {
                // throw new Error({"error": 404,"message":"bb"});
                throw new Error('Empty input provided');
            }
        } else {
            throw new Error('New value matches the old');
        }
        return result;
    }
    // TODO: update individual constraints for the properties and throw property-specific errors
    public validatePassword({ oldValue, newValue }: { oldValue: string | undefined; newValue: string; }) {
        return this.validateString(oldValue, newValue);
    }
    public validateEmail({ oldValue, newValue }: { oldValue: string | undefined; newValue: string; }) {
        return this.validateString(oldValue, newValue);
    }
    // tslint:disable-next-line: ban-types
    public validateAddress({ oldValue, newValue }: { oldValue: string | String | undefined; newValue: string; }) {
        return this.validateString(oldValue, newValue);
    }
    public validateAge({ oldValue, newValue }: { oldValue: number | undefined; newValue: number; }) {
        return this.validateNumeric(oldValue, newValue);
    }
    public validateHeight({ oldValue, newValue }: { oldValue: number | undefined; newValue: number; }) {
        return this.validateNumeric(oldValue, newValue);
    }
}
export default UserUtility;