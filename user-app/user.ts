export class User {
    // Fields
    public name: string;
    private password: string | undefined;
    private email: string | undefined;
    private friends: string[];
    public age: number | undefined;
    public height: number | undefined;
    public physAddress: string | undefined;

    // Constructor
    constructor(name: string) {
        this.name = name;
        this.friends = []
    }

    addAge(age: number) {
        this.age = age;
    }

    createPassword(pwd1: string, pwd2: string) {
        if (pwd1 === pwd2) {
            this.password = pwd1;
        } else {
            throw new Error('Passwords do not match: '  + pwd1 + ', ' + pwd2);
        }
    }

    addEmail(email: string) {
        if (this.email === undefined) {
            this.email = email;
        }
    }

    changeEmail(email: string) {
        if (this.email !== email) {
            this.email = email;
        }
    }

    // Answer:
    // https://stackoverflow.com/questions/11796093/is-there-a-way-to-provide-named-parameters-in-a-function-call-in-javascript
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    // https://mariusschulz.com/articles/typing-destructured-object-parameters-in-typescript
    addInfo({age, height, physAddress} :
            {age: number, height: number, physAddress: string}) {
        if (!this.age) {
            this.age = age;
        }
        if (!this.height) {
            this.height = height;
        }
        if (!this.physAddress) {
            this.physAddress = physAddress;
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

    addFriend(friend: User) {
        if (this.friends.indexOf(friend.name) <= -1) {
            // Not in the array
            this.friends.push(friend.name);
            if (friend.friends.indexOf(this.name) <= -1) {
                friend.addFriend(this);
                // Also works
                // friend.friends.push(this.name);
            }
        } else {
            throw new Error('Already friends: ' + this.name + ', ' + friend.name);
        }
    }

    removeFriend(friend: User) {
        if (this.friends.indexOf(friend.name) > -1) {
            // In the array
            const index = this.friends.indexOf(friend.name);
            this.friends.splice(index, 1);
            if (friend.friends.indexOf(this.name) > -1) {
                friend.removeFriend(this);
            }
        } else {
            throw new Error('Already unfriended: '  + this.name + ', ' + friend.name);
        }
    }
}