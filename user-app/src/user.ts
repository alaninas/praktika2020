import { BaseUser } from './baseUser';

export class User extends BaseUser{
    // Constructor
    constructor(name: string) {
        super(name);
    }
    addFriend(friend: User) {
        if (this.friends.indexOf(friend.name) <= -1) {
            // Not in the array
            this.friends.push(friend.name);
            if (friend.friends.indexOf(this.name) <= -1) {
                friend.addFriend(this);
            }
        } else {
            throw new Error('Already friends: ' + this.name + ', ' + friend.name);
        }
    }
    removeFriend(friend: User) {
        if (this.friends.indexOf(friend.name) > -1) {
            // In the array
            const index = this.friends.indexOf(friend.name);
            this.friends.splice(index, 1);
            if (friend.friends.indexOf(this.name) > -1) {
                friend.removeFriend(this);
            }
        } else {
            throw new Error('Already unfriended: '  + this.name + ', ' + friend.name);
        }
    }
}