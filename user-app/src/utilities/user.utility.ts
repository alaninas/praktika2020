import PatternUtility from './pattern.utility';

class UserUtility extends PatternUtility {
    // TODO: add additional parameter -- property Error object (possibly can be managed in the child functions)
    updateNumeric(oldValue: number | undefined, newValue: number) {
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
    updateString(oldValue: string | String | undefined, newValue: string) {
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
    public updatePassword({ oldValue, newValue }: { oldValue: string | undefined; newValue: string; }) {
        return this.updateString(oldValue, newValue);
    }
    public updateEmail({ oldValue, newValue }: { oldValue: string | undefined; newValue: string; }) {
        return this.updateString(oldValue, newValue);
    }
    // tslint:disable-next-line: ban-types
    public updateAddress({ oldValue, newValue }: { oldValue: string | String | undefined; newValue: string; }) {
        return this.updateString(oldValue, newValue);
    }
    public updateAge({ oldValue, newValue }: { oldValue: number | undefined; newValue: number; }) {
        return this.updateNumeric(oldValue, newValue);
    }
    public updateHeight({ oldValue, newValue }: { oldValue: number | undefined; newValue: number; }) {
        return this.updateNumeric(oldValue, newValue);
    }
}
export default UserUtility;