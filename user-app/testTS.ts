// Source
// https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html
// https://code.visualstudio.com/docs/typescript/typescript-compiling
// https://khalilstemmler.com/blogs/typescript/node-starter-project/

// 1
let message: string = "Hello World";

console.log(message);  

//  2
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