const fs = require('fs');
const User = require('./user.js');

const callbackFn = () => {
    console.log("success");
}

const firstUser = new User('Petras');
firstUser.addAge(55);

const secondUser = new User('PetroDraugas1');
firstUser.addAge(5,'defaultpswd');

fs.writeFile('users.txt', JSON.stringify([firstUser,secondUser]), {}, callbackFn);
// fs.writeFile('users.txt', JSON.stringify(secondUser), {}, callbackFn);