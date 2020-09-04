class User {
    constructor(name, password, email) {
        // this.name = name + "_stuff";
        this.name = name;
        this.password = password;
        this.email = email;
        this.friends = []
    }

    addAge(age) {
        this.age = age;
    }

    createPassword(pwd1, pwd2) {
        if (pwd1 === pwd2) {
            this.password = pwd1;
        }
    }

    addEmail(email) {
        if (this.email === undefined) {
            this.email = email;
        }
    }

    changeEmail(email) {
        if (this.email !== email) {
            this.email = email;
        }
    }

    // Answer:
    // https://stackoverflow.com/questions/11796093/is-there-a-way-to-provide-named-parameters-in-a-function-call-in-javascript
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    addInfo({age, height, physAddress}={}) {
        if (isNaN(this.age)) {
            this.age = age;
        }
        if (!this.height) {
            this.height = height;
        }
        if (!this.physAddress) {
            this.physAddress = physAddress;
        }
    }

    changeInfo({age, height, physAddress}={}) {
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

    addFriend(friend) {
        if (this.friends.indexOf(friend.name) <= -1) {
            // Not in the array
            this.friends.push(friend.name);
            if (friend.friends.indexOf(this.name) <= -1) {
                friend.addFriend(this);
                // Also works
                // friend.friends.push(this.name);
            }
        } else {
            return;
        }
    }

    removeFriend(friend) {
        if (this.friends.indexOf(friend.name) > -1) {
            // In the array
            this.friends.pop(friend.name);
            if (friend.friends.indexOf(this.name) > -1) {
                friend.removeFriend(this);
            }
        } else {
            return;
        }
    }
}

module.exports = User;