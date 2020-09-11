import { User } from './src/user';

test("#User", () => {
    const u = new User("Name1");
    expect(u.name).toBe("Name1");
    expect(u.email).toBeUndefined();
    u.addEmail("Mail.com");
    expect(() => {
        u.addEmail("Mail.com")
    }).toThrow("Email already set");
    expect(() => {
        u.changeEmail("Mail.com")
    }).toThrow("New email matches the old");
})

test("#User", () => {
    const u = new User("Name1");
    expect(() => {
        u.createPassword("Pswd1","Pswd2");
    }).toThrow("Passwords do not match");
    u.createPassword("Pswd1","Pswd1");
    expect(u.password).toBe("Pswd1");
    expect(() => {
        u.createPassword("Pswd1","Pswd2");
    }).toThrow("Password already set");
    expect(() => {
        u.changePassword("Pswd1");
    }).toThrow("New password matches the old");
})

test("#User", () => {
    const u = new User("Name1");
    const nE = new User("Name2");
    // M6
    expect(u.height).toBeUndefined();
    u.addInfo({ age: 5, height : 180, physAddress: '' });
    u.addInfo({ age: 5, height : 180, physAddress: '' });

    expect(u.physAddress?.length).toBe(0);
    u.addInfo({ age: 0, height : 0, physAddress : "addr" });
    u.addInfo({ age: 0, height : 0, physAddress : "addr" });

    expect(nE.age).toBeUndefined();
    // expect(function () {throw new Error("Parsing is not possible")}).toThrow("Parsing is not possible");
    nE.addInfo({ age : 180, height : 180, physAddress: '' });
    u.addInfo({ age : 180, height : 180, physAddress: 'nvnbvnbv' });

    // M7
    expect(u.height).not.toBe(177);
    u.changeInfo({ age: 180, height : 177, physAddress : "addr" });
    u.changeInfo({ age: 180, height : 177, physAddress : "addr" });

    expect(u.physAddress).not.toBe("myNewAdrress");
    u.changeInfo({ age: 180, height : 177, physAddress : "myNewAdrress" });
    u.changeInfo({ age: 180, height : 177, physAddress : "myNewAdrress" });
})
