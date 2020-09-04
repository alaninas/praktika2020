class User {
    constructor(name, password) {
        // this.name = name + "_stuff";
        this.name = name;
        this.password = password
    }

    addAge(age) {
        this.age = age;
    }

    createPassword(pwd1, pwd2) {
        if (pwd1 === pwd2) {
            this.password = pwd1;
        }
    }
}

module.exports = User;