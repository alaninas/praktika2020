class User {
    constructor(name, password, email) {
        // this.name = name + "_stuff";
        this.name = name;
        this.password = password;
        this.email = email
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
}

module.exports = User;