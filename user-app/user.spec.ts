import { User } from './user';

test("#User", () => {
    const u = new User("Name1");
    expect(u.name).toBe("Name1");
})
