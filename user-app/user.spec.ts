import { User } from './src/user';

test("#User", () => {
    const u = new User("Name1");
    expect(u.name).toBe("Name1");

    expect(u.friends.indexOf("mnbmnbm")).not.toBeGreaterThan(-1);
})
