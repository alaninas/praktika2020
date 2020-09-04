const User = require('./user.js');

test("#User", () => {
    const u = new User("Bla");
    expect(u.name).toBe("Bla");
})