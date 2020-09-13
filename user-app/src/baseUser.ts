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

    // Constructor
    constructor(name: string) {
        this.name = name;
        this.friends = []
    }

    // tslint:disable-next-line: ban-types
    isEmpty(str: string | String | undefined) {
        return (!str || str.length === 0 || str.trim().length === 0);
    }
    public isBadNumber(inpNumber: any) {
        return (!inpNumber || Number.isNaN(inpNumber) || inpNumber < 0);
    }

    // TODO: move all of the property constraints up into an field type checker
    // class (which will have no dependency on User logic whatsoever)
    createPassword(pwd1: string, pwd2: string) {
        if (this.password === undefined) {
            if (pwd1 === pwd2 && pwd1 !== undefined) {
                // TODO: add constraint on password format
                this.password = pwd1;
            } else {
                throw new Error('Passwords do not match');
            }
        } else {
            throw new Error('Password already set');
        }
    }
    addEmail(email: string) {
        if (this.isEmpty(this.email)) {
            // TODO: add constraint on email format
            if (!this.isEmpty(email)) {
                this.email = email;
            }
        } else {
            throw new Error('Email already set');
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
        if (!this.physAddress) {
            //
            if (!this.isEmpty(physAddress)) {
                this.physAddress = physAddress;
            }
        }
        if (this.isBadNumber(age) && this.isBadNumber(height) && this.isEmpty(physAddress)) {
            throw new Error('No valid input information provided');
        }
    }
    changePassword(pwd2: string) {
        if (this.password !== pwd2) {
            // TODO: add constraint on password format
            if (!this.isEmpty(pwd2)) {
                // TODO: add constraint on password format
                this.password = pwd2;
            } else {
                // throw new Error({"error": 404,"message":"bb"});
                throw new Error('Empty password provided');
            }
        } else {
            throw new Error('New password matches the old');
        }
    }
    changeEmail(email: string) {
        if (this.email !== email) {
            // TODO: add constraint on email format
            this.email = email;
        } else {
            throw new Error('New email matches the old');
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
        if (this.physAddress !== physAddress) {
            //
            if (!this.isEmpty(physAddress)) {
                this.physAddress = physAddress;
            }
        }
        if (this.isBadNumber(age) && this.isBadNumber(height) && this.isEmpty(physAddress)) {
            throw new Error('No valid update information provided');
        }
    }
}