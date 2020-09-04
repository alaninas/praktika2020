const fs = require('fs');
const User = require('./user.js');

const callbackFn = () => {
    console.log("success");
}

const firstUser = new User('Petras');
firstUser.addAge(55);

const secondUser = new User('PDraugas1','PDraugas1Pswd');
secondUser.addAge(5);

firstUser.createPassword('PetrasPswd','PetrasPswd');

secondUser.createPassword('PD1','PD2');

const thirdUser = new User('PDraugas2','PD2Pswd', 'PD2email.com');
thirdUser.addAge(52);

thirdUser.addEmail('PD2newEmail.com');
firstUser.addEmail('PetrasEmail.com');

fs.writeFile('users.txt', 
             JSON.stringify([firstUser,secondUser, thirdUser]), 
             {}, 
             callbackFn);
// fs.writeFile('users.txt', JSON.stringify(secondUser), {}, callbackFn);