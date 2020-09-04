class User {
    constructor(name) {
        this.name = name + "_stuff";
    }

    addAge(age) {
        this.age = age;
    }
}

module.exports = User;