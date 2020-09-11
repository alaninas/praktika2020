export class User {
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

    createPassword(pwd1: string, pwd2: string) {
        if (this.password === undefined) {
            if (pwd1 === pwd2 && pwd1 !== undefined) {
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
            this.email = email;
        } else {
            throw new Error('Email already set');
        }
    }
    addInfo({age, height, physAddress} :
            {age: number, height: number, physAddress: string}) {
        if (!this.age && age > 0) {
            this.age = age;
        }
        if (!this.height && height > 0) {
            this.height = height;
        }
        if (!this.physAddress && !physAddress) {
            this.physAddress = physAddress;
        }
    }
    changePassword(pwd2: string) {
        if (this.password !== pwd2) {
            this.password = pwd2;
        } else {
            throw new Error('New password matches the old');
        }
    }
    changeEmail(email: string) {
        if (this.email !== email) {
            this.email = email;
        } else {
            throw new Error('New email matches the old');
        }
    }
    changeInfo({age, height, physAddress} :
        {age: number, height: number, physAddress: string}) {
        if (this.age !== age) {
            this.age = age;
        }
        if (this.height !== height) {
            this.height = height;
        }
        if (this.physAddress !== physAddress) {
            this.physAddress = physAddress;
        }
    }
}