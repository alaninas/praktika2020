export class BaseUser {
    // Fields
    public name: string;
    public password: string | undefined;
    public email: string | undefined;
    public friends: string[];
    public age: number | undefined;
    public height: number | undefined;
    public physAddress: string | undefined;

    // Constructor
    constructor(name: string) {
        this.name = name;
        this.friends = []
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
        if (this.email === undefined && email !== undefined) {
            // TODO: add constraint on email format
            this.email = email;
        } else {
            throw new Error('Email already set');
        }
    }
    addInfo({age, height, physAddress} :
            {age: number, height: number, physAddress: string}) {
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
            if (!physAddress || physAddress.length > 0) {
                this.physAddress = physAddress;
            }
        }
    }
    changePassword(pwd2: string) {
        if (this.password !== pwd2) {
            // TODO: add constraint on password format
            this.password = pwd2;
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
        {age: number, height: number, physAddress: string}) {
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
            if (!physAddress || physAddress.length > 0) {
                this.physAddress = physAddress;
            }
        }
    }
}