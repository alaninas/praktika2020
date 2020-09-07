import User from './user';
import * as fs from 'fs';

const callbackFn = () => {
    console.log("success");
}

const firstUser = new User('Petras', '', '', []);
firstUser.addAge(55);

const secondUser = new User('PD1', 'PD1Pswd', '', []);
secondUser.addAge(5);

firstUser.createPassword('PetrasPswd','PetrasPswd');

secondUser.createPassword('PD1', 'PD2');

const thirdUser = new User('PD2', 'PD2Pswd', 'PD2email.com', []);
thirdUser.addAge(52);

thirdUser.addEmail('PD2newEmail.com');
firstUser.addEmail('PetrasEmail.com');

thirdUser.changeEmail('PD2newEmail.com');

thirdUser.addInfo({ age: undefined, height : 175, physAddress: '' });
thirdUser.addInfo({ age: undefined, height : 180, physAddress: '' });
thirdUser.changeInfo({ age: undefined, height : 177, physAddress: '' });

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