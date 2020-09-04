class User {
    constructor(name, password, email, info) {
        // this.name = name + "_stuff";
        this.name = name;
        this.password = password;
        this.email = email;
        this.info = info
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
        if (!this.email) {
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
    addInfo({age, height, physAddress, extras}={}) {
        if (!this.age) {
            this.age = age;
        }
        if (!this.height) {
            this.height = height;
        }
        if (!this.physAddress) {
            this.physAddress = physAddress;
        }
        if (!this.extras) {
            this.extras = extras;
        }
    }

    changeInfo({age, height, physAddress, extras}={}) {
        if (this.age !== age) {
            this.age = age;
        }
        if (this.height !== height) {
            this.height = height;
        }
        if (this.physAddress !== physAddress) {
            this.physAddress = physAddress;
        }
        if (this.extras !== extras) {
            this.extras = extras;
        }
    }

    addFriend(friend) {
        if ( typeof(friend) === 'object' ) {
            let ttt = friend;
            let native = this;
            this.friend = ttt;
            // if (ttt.friend !== native) {
                // ttt.friend = native;
            // }
            // friend.friend = this;
        }
    }

}

module.exports = User;