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
    myFunction({age, height, physAddress, extras}={}) {
       this.age = age;
       this.height = height;
       this.physAddress = physAddress;
       this.extras = extras
    }

    addInfo(info) {
        if (!this.info) {
            this.info = info;
        }
    }

    changeInfo(info) {
        if (this.info !== info) {
            this.info = info;
        }
    }
}

module.exports = User;