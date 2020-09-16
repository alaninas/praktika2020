import PatternUtility from './pattern.utility';
// import mongoose, { model } from 'mongoose';
import IPerson from '../models/user.interface';

class UserVUtility extends PatternUtility {
    private user: IPerson;
    constructor(inp: IPerson) {
        super();
        this.user = inp;
    }
    // TODO: add additional parameter -- property Error object (possibly can be managed in the child functions)
    validateNumeric(newValue: number) {
        let result = 0;
        if (!this.isBadNumber(newValue)) {
            result = 1;
        }
        // else {
            // throw new Error('Number not positive int');
        // }
        return result;
    }
    // tslint:disable-next-line: ban-types
    validateString(newValue: string) {
        let result = 0;
        if (!this.isEmpty(newValue)) {
            result = 1;
        }
        // else {
            // throw new Error('Empty input provided');
        // }
        return result;
    }
    // tslint:disable-next-line: ban-types
    validatePswd(oldValue: string | String | undefined, newValue: string) {
        let result = 0;
        if (oldValue !== newValue) {
            result = this.validateString(newValue);
        } else {
            throw new Error('New password matches the old');
        }
        return result;
    }
    // TODO: update individual constraints for the properties and throw property-specific errors
    public checkPassword(newValue: string) {
        return this.validatePswd(this.user.password, newValue) ? newValue : this.user.password;
    }
    public checkEmail(newValue: string) {
        return this.validateString(newValue) ? newValue : this.user.email;
    }
    public checkAddress(newValue: string) {
        return this.validateString(newValue) ? newValue : this.user.address;
    }
    public checkAge(newValue: number) {
        return this.validateNumeric(newValue) ? newValue : this.user.age;
    }
    public checkHeight(newValue: number) {
        return this.validateNumeric(newValue) ? newValue : this.user.height;
    }
}
export default UserVUtility;