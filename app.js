const fs = require('fs');
const User = require('./user.js');

const callbackFn = () => {
    console.log("success");
}

const firstUser = new User('Petras');
firstUser.addAge(55);

const secondUser = new User('PD1','PD1Pswd');
secondUser.addAge(5);

firstUser.createPassword('PetrasPswd','PetrasPswd');

secondUser.createPassword('PD1','PD2');

const thirdUser = new User('PD2','PD2Pswd', 'PD2email.com', 'PD2info');
thirdUser.addAge(52);

thirdUser.addEmail('PD2newEmail.com');
firstUser.addEmail('PetrasEmail.com');

thirdUser.changeEmail('PD2newEmail.com');
// thirdUser.addInfo('PD2NewInfo');
// thirdUser.changeInfo('PD2NewInfo');

thirdUser.addInfo({ height : 175 });
thirdUser.addInfo({ height : 180 });
thirdUser.changeInfo({ height : 177 });

thirdUser.addFriend(firstUser);

// fs.writeFile('users.txt', 
            //  JSON.stringify([firstUser,secondUser, thirdUser]), 
            //  {}, 
            //  callbackFn);

fs.writeFile('users.txt', 
             JSON.stringify(thirdUser), 
             {}, 
             callbackFn);
// fs.writeFile('users.txt', JSON.stringify(secondUser), {}, callbackFn);