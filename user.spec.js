const User = require('./user.js');

// Examples
// https://jestjs.io/docs/en/expect
test("#User", () => {
    const u = new User("Name1", "Pswd1", "Mail.com", []);

    // M1
    expect(u.name).toBe("Name1");
    expect(u.password).toBe("Pswd1");
    expect(u.email).toBe("Mail.com");
    expect(u.friends.indexOf("mnbmnbm")).not.toBeGreaterThan(-1);

    // M2
    u.addAge(52);
    // expect(u.age).toBe(52);

    // M3
    u.createPassword('PD1', 'PD1');
    expect(u.password).toBe("PD1");
    u.createPassword('PD1', 'PD2');
    expect(u.password).toBe("PD1");

    // M4
    const nE = new User("Name2", "Pswd2");
    expect(nE.email).toBeUndefined();
    nE.addEmail('newMail.com');
    nE.addEmail('newMail.com');
    
    // M5
    expect(u.email).not.toBe("newMail.com");
    u.changeEmail('newMail.com');
    u.changeEmail('newMail.com');

    // M6
    expect(u.height).toBeUndefined();
    u.addInfo({ height : 180 });
    u.addInfo({ height : 180 });

    expect(u.physAddress).toBeUndefined();
    u.addInfo({ physAddress : "addr" });
    u.addInfo({ physAddress : "addr" });

    expect(nE.age).toBeUndefined();
    // expect(function () {throw new Error("Parsing is not possible")}).toThrow("Parsing is not possible");
    nE.addInfo({ age : 180 });
    u.addInfo();

    // M7
    expect(u.height).not.toBe(177);
    u.changeInfo({ height : 177 });
    u.changeInfo({ height : 177 });

    expect(u.physAddress).not.toBe("myNewAdrress");
    u.changeInfo({ physAddress : "myNewAdrress" });
    u.changeInfo();

    // M8
    expect(u.friends.indexOf(nE.name)).toBeLessThanOrEqual(-1);
    u.addFriend(nE);
    expect(u.friends.indexOf(nE.name)).toBeGreaterThan(-1);
    u.addFriend(nE);

    // M9
    expect(u.friends.indexOf(nE.name)).toBeGreaterThan(-1);
    u.removeFriend(nE);
    expect(u.friends.indexOf(nE.name)).toBeLessThanOrEqual(-1);
    u.removeFriend(nE);
})
