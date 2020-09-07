// Source
// https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html
// https://code.visualstudio.com/docs/typescript/typescript-compiling
// https://khalilstemmler.com/blogs/typescript/node-starter-project/

// Command
// tsc --watch $0.ts
// nodemon $0.js

// 1
let message: string = "Hello World";

console.log(message);  

//  2 Classes
interface User {
    name: string;
    id: number;
  }
  
class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);

console.log(JSON.stringify(user)); 

// 3 Unions
function wrapInArray(obj: string | string[]) {
    if (typeof obj === "string") {
      return [obj]; // ^ = (parameter) obj: string
    } else {
      return obj;
    }
}

console.log(wrapInArray("myTestString")); 
console.log(wrapInArray(["myTestArray"])); 

// 4 Generics
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

function fun<T>(args:T):T {
    return args;
}

// for string
let resultS = fun<string>("Hello World from inside Fun");

// for number
let resultN = fun<number>(200);

console.log(resultS);  
console.log(resultN);  

// 5 Structural typing, Duck typing
interface Point {
    x: number;
    y: number;
}

function printPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// prints "12, 26"
const point = { x: 12, y: 26 };
printPoint(point);

const point3 = { x: 12, y: 26, z: 89 };
printPoint(point3); // prints "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
printPoint(rect); // prints "33, 3"

// const color = { hex: "#187ABF" };
// printPoint(color);

// OOP
// 6 Erased structural types
interface Pointlike {
    x: number;
    y: number;
  }
  interface Named {
    name: string;
  }
  
  function printPointOOP(point: Pointlike) {
    console.log("x = " + point.x + ", y = " + point.y);
  }
  
  function printName(x: Named) {
    console.log("Hello, " + x.name);
  }
  
  const obj = {
    x: 0,
    y: 0,
    name: "Origin",
  };
  
  printPointOOP(obj);
  printName(obj);
