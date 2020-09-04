const fs = require('fs');
const User = require('./user.js');

const callbackFn = () => {
    console.log("success");
}

const firstUser = new User('Petras');
firstUser.addAge(55);

const secondUser = new User('PetroDraugas1','PetroDraugas1Pswd');
secondUser.addAge(5);

firstUser.createPassword('PetrasPswd','PetrasPswd');

secondUser.createPassword('PD1','PD2');

fs.writeFile('users.txt', JSON.stringify([firstUser,secondUser]), {}, callbackFn);
// fs.writeFile('users.txt', JSON.stringify(secondUser), {}, callbackFn);