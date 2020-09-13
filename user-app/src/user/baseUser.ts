import NumberValidator from '../validators/numberValidator';
import StringValidator from '../validators/stringValidator';

export class BaseUser {
    // Fields
    public name: string;
    public password: string | undefined;
    public email: string | undefined;
    public friends: string[];
    public age: number | undefined;
    public height: number | undefined;
    // tslint:disable-next-line: ban-types
    public physAddress: string | String | undefined;
    public nrValidator = new NumberValidator();
    public strValidator = new StringValidator();

    // Constructor
    constructor(name: string) {
        this.name = name;
        this.friends = []
    }

    createPassword(pwd1: string, pwd2: string) {
        if (this.strValidator.newPassword({oldValue: this.password, pwd: pwd1, repeat: pwd2})) {
            this.password = pwd1;
        }
    }
    addEmail(email: string) {
        if (this.strValidator.newEmail({oldValue: this.email, newValue: email})) {
            this.email = email;
        }
    }
    addInfo({age, height, physAddress} :
            // tslint:disable-next-line: ban-types
            {age: number, height: number, physAddress: string | String}) {
        if (!this.age) {
            //
            if (age > 0) {
                this.age = age;
            }
        }
        if (!this.height) {
            //
            if (height > 0) {
                this.height = height;
            }
        }
        if (this.strValidator.newAddress({oldValue: this.physAddress, newValue: physAddress})) {
            this.physAddress = physAddress;
        }
        if (this.nrValidator.isBadNumber(age) && this.nrValidator.isBadNumber(height) && this.strValidator.isEmpty(physAddress)) {
            throw new Error('No valid input information provided');
        }
    }
    changePassword(pwd2: string) {
        if (this.strValidator.updatePassword({oldValue: this.password, newValue: pwd2})) {
            this.password = pwd2;
        }
    }
    changeEmail(email: string) {
        if (this.strValidator.updateEmail({oldValue: this.email, newValue: email})) {
            this.email = email;
        }
    }
    changeInfo({age, height, physAddress} :
        // tslint:disable-next-line: ban-types
        {age: number, height: number, physAddress: string | String}) {
        if (this.age !== age) {
            //
            if (age > 0) {
                this.age = age;
            }
        }
        if (this.height !== height) {
            //
            if (height > 0) {
                this.height = height;
            }
        }
        if (this.strValidator.updateAddress({oldValue: this.physAddress, newValue: physAddress})) {
            this.physAddress = physAddress;
        }
        if (this.nrValidator.isBadNumber(age) && this.nrValidator.isBadNumber(height) && this.strValidator.isEmpty(physAddress)) {
            throw new Error('No valid update information provided');
        }
    }
}