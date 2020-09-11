import { Friend } from './src/friend';

test("#Friend", () => {
    const u = new Friend("Name1");
    const nE = new Friend("Name2");
    expect(u.friends.length).toBeLessThanOrEqual(0);
    expect(u.friends.indexOf(nE.name)).toBeLessThanOrEqual(-1);
    u.addFriend(nE);
    expect(u.friends.indexOf(nE.name)).toBeGreaterThan(-1);
    expect(() => {
        u.addFriend(nE)
    }).toThrow("Already friends: Name1, Name2");
})

test("#Friend", () => {
    const u = new Friend("Name1");
    const nE = new Friend("Name2");
    u.addFriend(nE);
    expect(u.friends.indexOf(nE.name)).toBeGreaterThan(-1);
    u.removeFriend(nE);
    expect(u.friends.indexOf(nE.name)).toBeLessThanOrEqual(-1);
    expect(() => {
        u.removeFriend(nE)
    }).toThrow("Already unfriended: Name1, Name2");
})