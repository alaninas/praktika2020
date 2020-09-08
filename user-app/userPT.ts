export class User {

    private friends: Array<string>;
    public name: string;

    constructor( name : string ) {
        this.name = name;
        this.friends = [];
    }

    addFriend(friend: User) {
        if (this.friends.indexOf(friend.name) <= -1) {
            // Not in the array
            this.friends.push(friend.name);
            if (friend.friends.indexOf(this.name) <= -1) {
                friend.addFriend(this);
                // Also works
                // friend.friends.push(this.name);
            }
        }
    }

    removeFriend(friend: User) {
        if (this.friends.indexOf(friend.name) > -1) {
            // In the array
            let index = this.friends.indexOf(friend.name);
            this.friends.splice(index, 1);
            if (friend.friends.indexOf(this.name) > -1) {
                friend.removeFriend(this);
            }
        }
    }
}