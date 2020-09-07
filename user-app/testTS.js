// Source
// https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html
// https://code.visualstudio.com/docs/typescript/typescript-compiling
// https://khalilstemmler.com/blogs/typescript/node-starter-project/
// 1
var message = "Hello World";
console.log(message);
var UserAccount = /** @class */ (function () {
    function UserAccount(name, id) {
        this.name = name;
        this.id = id;
    }
    return UserAccount;
}());
var user = new UserAccount("Murphy", 1);
