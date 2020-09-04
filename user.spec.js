const User = require('./user.js');

// Examples
// https://howtodoinjava.com/javascript/jasmine-unit-testing-tutorial/
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
    
    // M5
    u.changeEmail('newMail.com');
    expect(u.email).toBe("newMail.com");

    // M6
    u.addInfo({ height : 180 });
    expect(u.height).toBe(180);
    // expect(function () {throw new Error("Parsing is not possible")}).toThrow("Parsing is not possible");
    nE.addInfo({ age : 180 });
    // expect(u.addInfo({ age : 180 })).toThrow(new Error("Age existing."));
    // expect(u.age).toBe(52);

    // M7
    u.changeInfo({ height : 177 });
    expect(u.height).toBe(177);
    u.changeInfo({ physAddress : "myNewAdrress" });
    expect(u.physAddress).toBe("myNewAdrress");

    // M8
    u.addFriend(nE);

    // M9
    u.removeFriend(nE);
})
