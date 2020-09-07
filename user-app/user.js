"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    // Constructor 
    function User(name, password, email, friends) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.friends = friends;
    }
    User.prototype.addAge = function (age) {
        this.age = age;
    };
    User.prototype.createPassword = function (pwd1, pwd2) {
        if (pwd1 === pwd2) {
            this.password = pwd1;
        }
    };
    User.prototype.addEmail = function (email) {
        if (this.email === undefined) {
            this.email = email;
        }
    };
    User.prototype.changeEmail = function (email) {
        if (this.email !== email) {
            this.email = email;
        }
    };
    // Answer:
    // https://stackoverflow.com/questions/11796093/is-there-a-way-to-provide-named-parameters-in-a-function-call-in-javascript
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    // https://mariusschulz.com/articles/typing-destructured-object-parameters-in-typescript
    User.prototype.addInfo = function (_a) {
        var age = _a.age, height = _a.height, physAddress = _a.physAddress;
        if (!this.age) {
            this.age = age;
        }
        if (!this.height) {
            this.height = height;
        }
        if (!this.physAddress) {
            this.physAddress = physAddress;
        }
    };
    User.prototype.changeInfo = function (_a) {
        var age = _a.age, height = _a.height, physAddress = _a.physAddress;
        if (this.age !== age) {
            this.age = age;
        }
        if (this.height !== height) {
            this.height = height;
        }
        if (this.physAddress !== physAddress) {
            this.physAddress = physAddress;
        }
    };
    User.prototype.addFriend = function (friend) {
        if (this.friends.indexOf(friend.name) <= -1) {
            // Not in the array
            this.friends.push(friend.name);
            if (friend.friends.indexOf(this.name) <= -1) {
                friend.addFriend(this);
                // Also works
                // friend.friends.push(this.name);
            }
        }
    };
    User.prototype.removeFriend = function (friend) {
        if (this.friends.indexOf(friend.name) > -1) {
            // In the array
            var index = this.friends.indexOf(friend.name);
            this.friends.splice(index, 1);
            if (friend.friends.indexOf(this.name) > -1) {
                friend.removeFriend(this);
            }
        }
    };
    return User;
}());
exports["default"] = User;
