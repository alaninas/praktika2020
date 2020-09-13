import { BaseUser } from './baseUser';

test("#BaseUserConstructor", () => {
    const u = new BaseUser("Name1");
    expect(u.name).toBe("Name1");
})

test("#BaseUserMail", () => {
    const u = new BaseUser("Name1");
    expect(u.email).toBeUndefined();
    u.addEmail("");
    u.addEmail("Mail.com");
    expect(() => {
        u.addEmail("Mail.com")
    }).toThrow("Email already set");
    expect(() => {
        u.changeEmail("Mail.com")
    }).toThrow("New email matches the old");
    expect(u.email).not.toBe("MailNew.com");
    u.changeEmail("MailNew.com");
})

test("#BaseUserPswd", () => {
    const u = new BaseUser("Name1");
    expect(() => {
        u.createPassword("Pswd","PswdUnmatched");
    }).toThrow("Passwords do not match");
    u.createPassword("Pswd","Pswd");
    expect(u.password).toBe("Pswd");
    expect(() => {
        u.createPassword("Pswd","PswdUnmatched");
    }).toThrow("Password already set");
    expect(() => {
        u.changePassword("Pswd");
    }).toThrow("New password matches the old");
    expect(u.password).not.toBe("PswdNew");
    u.changePassword("PswdNew");
    expect(() => {
        u.changePassword('');
    }).toThrow("Empty password provided");
})

test("#BaseUserInfo Add", () => {
    const u = new BaseUser("Name1");
    const nE = new BaseUser("Name2");
    // M6
    expect(u.height).toBeUndefined();
    expect(u.age).toBeUndefined();
    expect(u.physAddress).toBeUndefined();
    expect(() => {
        u.addInfo({ age: -1, height : 8, physAddress: 'x' });
    }).toThrow("Number not positive int");
    expect(() => {
        u.addInfo({ age: 8, height : -1, physAddress: 'y' });
    }).toThrow("Number not positive int");
    expect(() => {
        u.addInfo({ age: 9, height : 9, physAddress: '' });
    }).toThrow("Empty address provided");
    // u.addInfo({ age: -1, height : -1, physAddress: new String() });
    expect(u.physAddress).not.toBe('myAddress');
    u.addInfo({ age: 9, height : 9, physAddress: 'myAddress' });
    expect(u.age).not.toBe(5);
    expect(u.height).not.toBe(180);
    u.addInfo({ age: 5, height : 180, physAddress: '' });
    u.addInfo({ age: 5, height : 180, physAddress: '' });
})

test("#BaseUserInfo Change", () => {
    const u = new BaseUser("Name1");
    const nE = new BaseUser("Name2");
    // M6
    expect(u.height).toBeUndefined();
    expect(u.age).toBeUndefined();
    expect(u.physAddress).toBeUndefined();
    // M7
    expect(() => {
        u.changeInfo({ age: -1, height : 8, physAddress: 'x' });
    }).toThrow("Number not positive int");
    expect(() => {
        u.changeInfo({ age: 8, height : -1, physAddress: 'y' });
    }).toThrow("Number not positive int");
    expect(() => {
        u.changeInfo({ age: 9, height : 9, physAddress: '' });
    }).toThrow("Empty address provided");
    expect(u.physAddress).not.toBe('myAddressNew');
    u.changeInfo({ age: 10, height : 10, physAddress: 'myAddressNew' });
    expect(u.age).not.toBe(180);
    expect(u.height).not.toBe(177);
    u.changeInfo({ age: 180, height : 177, physAddress : "z" });
    u.changeInfo({ age: 180, height : 177, physAddress : "z" });
})
