import User from './user';
import * as fs from 'fs';

const callbackFn = () => {
    console.log("success");
}

const firstUser = new User('Petras', '', '', [], 0, 0,'');
firstUser.addAge(55);

const secondUser = new User('PD1', 'PD1Pswd', '', [], 0,0,'');
secondUser.addAge(5);

firstUser.createPassword('PetrasPswd','PetrasPswd');

secondUser.createPassword('PD1', 'PD2');

const thirdUser = new User('PD2', 'PD2Pswd', 'PD2email.com', [],0,0,'');
thirdUser.addAge(52);

thirdUser.addEmail('PD2newEmail.com');
firstUser.addEmail('PetrasEmail.com');

thirdUser.changeEmail('PD2newEmail.com');

thirdUser.addInfo({ age: 0, height : 175, physAddress: '' });
thirdUser.addInfo({ age: 0, height : 180, physAddress: '' });
thirdUser.changeInfo({ age: 0, height : 177, physAddress: '' });

thirdUser.addFriend(firstUser);
thirdUser.addFriend(firstUser);
thirdUser.addFriend(firstUser);

firstUser.removeFriend(thirdUser);
firstUser.removeFriend(thirdUser);

firstUser.addFriend(secondUser);

fs.writeFile('users.json', 
             JSON.stringify([firstUser, secondUser, thirdUser]), 
             {}, 
             callbackFn);

// fs.writeFile('users.txt', 
              // JSON.stringify([thirdUser, firstUser]), 
              // {}, 
              // callbackFn);