import { User } from './src/user';

test("#User", () => {
    const u = new User("Name1");
    expect(u.name).toBe("Name1");
})
