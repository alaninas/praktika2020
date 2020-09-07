// Source
// https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html
// https://code.visualstudio.com/docs/typescript/typescript-compiling
// https://khalilstemmler.com/blogs/typescript/node-starter-project/
// Command
// tsc --watch $0.ts
// nodemon $0.js
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
console.log(JSON.stringify(user));
// 3 Unions
function wrapInArray(obj) {
    if (typeof obj === "string") {
        return [obj]; // ^ = (parameter) obj: string
    }
    else {
        return obj;
    }
}
console.log(wrapInArray("myTestString"));
console.log(wrapInArray(["myTestArray"]));
function fun(args) {
    return args;
}
// for string
var resultS = fun("Hello World from inside Fun");
// for number
var resultN = fun(200);
console.log(resultS);
console.log(resultN);
function printPoint(p) {
    console.log(p.x + ", " + p.y);
}
// prints "12, 26"
var point = { x: 12, y: 26 };
printPoint(point);
var point3 = { x: 12, y: 26, z: 89 };
printPoint(point3); // prints "12, 26"
var rect = { x: 33, y: 3, width: 30, height: 80 };
printPoint(rect); // prints "33, 3"
function printPointOOP(point) {
    console.log("x = " + point.x + ", y = " + point.y);
}
function printName(x) {
    console.log("Hello, " + x.name);
}
var obj = {
    x: 0,
    y: 0,
    name: "Origin"
};
printPointOOP(obj);
printName(obj);
