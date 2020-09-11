import { User } from './src/user';

test("#Friend", () => {
    const u = new User("Name1");
    const nE = new User("Name2");
    expect(u.friends.length).toBeLessThanOrEqual(0);
    expect(u.friends.indexOf(nE.name)).toBeLessThanOrEqual(-1);
    u.addFriend(nE);
    expect(u.friends.indexOf(nE.name)).toBeGreaterThan(-1);
    expect(() => {
        u.addFriend(nE)
    }).toThrow("Already friends: Name1, Name2");
})

test("#Friend", () => {
    const u = new User("Name1");
    const nE = new User("Name2");
    u.addFriend(nE);
    expect(u.friends.indexOf(nE.name)).toBeGreaterThan(-1);
    u.removeFriend(nE);
    expect(u.friends.indexOf(nE.name)).toBeLessThanOrEqual(-1);
    expect(() => {
        u.removeFriend(nE)
    }).toThrow("Already unfriended: Name1, Name2");
})