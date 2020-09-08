export class User {

    private friends: User[];
    public name: string;

    constructor(name: string) {
        this.name = name;
        this.friends = [];
    }

    addFriends(friend: User) {
        this.friends.push(friend);
    }
}