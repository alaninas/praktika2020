export default class User {
    // Fields 
    private name: string; 
    private password: string; 
    private email: string; 
    private friends: Array<string>; 
    private age: number;
    private height: number;
    private physAddress: string;
 
    // Constructor 
    constructor(name: string, password: string, 
                email: string, friends: Array<string>,
                age: number, height: number, physAddress: string ) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.friends = friends;
        this.age = age;
        this.height = height;
        this.physAddress = physAddress;
    }  
    
    addAge(age: number) {
        this.age = age;
    }

    createPassword(pwd1: string, pwd2: string) {
        if (pwd1 === pwd2) {
            this.password = pwd1;
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
        }
    }

    removeFriend(friend: User) {
        if (this.friends.indexOf(friend.name) > -1) {
            // In the array
            let index = this.friends.indexOf(friend.name);
            this.friends.splice(index, 1);
            if (friend.friends.indexOf(this.name) > -1) {
                friend.removeFriend(this);
            }
        }
    }
}