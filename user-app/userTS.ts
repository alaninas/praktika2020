export default class User {
    // fields 
    name:string; 
    password:string; 
    email:string; 
    friends:Array<string>; 
 
    //constructor 
    constructor(name:string, password:string, email:string, friends:Array<string>) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.friends = friends
    }    
}