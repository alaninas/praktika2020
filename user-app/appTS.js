"use strict";
exports.__esModule = true;
var userTS_1 = require("./userTS");
var fs = require("fs");
var callbackFn = function () {
    console.log("success");
};
var firstUser = new userTS_1["default"]('Petras', '', '', []);
firstUser.addAge(55);
var secondUser = new userTS_1["default"]('PD1', 'PD1Pswd', '', []);
secondUser.addAge(5);
firstUser.createPassword('PetrasPswd', 'PetrasPswd');
secondUser.createPassword('PD1', 'PD2');
var thirdUser = new userTS_1["default"]('PD2', 'PD2Pswd', 'PD2email.com', []);
thirdUser.addAge(52);
thirdUser.addEmail('PD2newEmail.com');
firstUser.addEmail('PetrasEmail.com');
thirdUser.changeEmail('PD2newEmail.com');
// thirdUser.addInfo('PD2NewInfo');
// thirdUser.changeInfo('PD2NewInfo');
thirdUser.addInfo({ age: undefined, height: 175, physAddress: '' });
thirdUser.addInfo({ age: undefined, height: 180, physAddress: '' });
thirdUser.changeInfo({ age: undefined, height: 177, physAddress: '' });
thirdUser.addFriend(firstUser);
thirdUser.addFriend(firstUser);
thirdUser.addFriend(firstUser);
firstUser.removeFriend(thirdUser);
firstUser.removeFriend(thirdUser);
firstUser.addFriend(secondUser);
fs.writeFile('users.json', JSON.stringify([firstUser, secondUser, thirdUser]), {}, callbackFn);
// fs.writeFile('users.txt', 
// JSON.stringify([thirdUser, firstUser]), 
// {}, 
// callbackFn);
