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
    expect(u.age).toBe(52);

    // M3
    u.createPassword('PD1', 'PD1');
    expect(u.password).toBe("PD1");
    u.createPassword('PD1', 'PD2');
    expect(u.password).toBe("PD1");

    // M4
    const nE = new User("Name2", "Pswd2");
    // expect(nE.email).toBeUndefined();
    nE.addEmail('newMail.com');
    u.addEmail('newMail.com');
    
    // M5
    u.changeEmail('newMail.com');
    expect(u.email).toBe("newMail.com");
    u.changeEmail('newMail.com');

    // M6
    u.addInfo({ height : 180 });
    expect(u.height).toBe(180);
    u.addInfo({ height : 180 });
    u.addInfo({ physAddress : "addr" });
    u.addInfo({ physAddress : "addr" });
    // expect(function () {throw new Error("Parsing is not possible")}).toThrow("Parsing is not possible");
    nE.addInfo({ age : 180 });
    // expect(u.addInfo({ age : 180 })).toThrow(new Error("Age existing."));
    // expect(u.age).toBe(52);
    u.addInfo();

    // M7
    u.changeInfo({ height : 177 });
    expect(u.height).toBe(177);
    u.changeInfo({ height : 177 });
    u.changeInfo({ physAddress : "myNewAdrress" });
    expect(u.physAddress).toBe("myNewAdrress");
    u.changeInfo();

    // M8
    u.addFriend(nE);
    u.addFriend(nE);

    // M9
    u.removeFriend(nE);
    u.removeFriend(nE);
})
