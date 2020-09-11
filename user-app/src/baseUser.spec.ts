import { BaseUser } from './baseUser';

test("#BaseUserConstructor", () => {
    const u = new BaseUser("Name1");
    expect(u.name).toBe("Name1");
})

test("#BaseUserMail", () => {
    const u = new BaseUser("Name1");
    expect(u.email).toBeUndefined();
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
})

test("#BaseUserInfo", () => {
    const u = new BaseUser("Name1");
    const nE = new BaseUser("Name2");
    // M6
    expect(u.height).toBeUndefined();
    expect(u.age).toBeUndefined();
    expect(u.physAddress).toBeUndefined();
    u.addInfo({ age: -1, height : -1, physAddress: '' });
    // tslint:disable-next-line: no-construct
    u.addInfo({ age: -1, height : -1, physAddress: new String() });
    expect(u.physAddress).not.toBe('myAddress');
    u.addInfo({ age: -1, height : -1, physAddress: 'myAddress' });
    expect(u.age).not.toBe(5);
    expect(u.height).not.toBe(180);
    u.addInfo({ age: 5, height : 180, physAddress: '' });
    u.addInfo({ age: 5, height : 180, physAddress: '' });

    // M7
    u.changeInfo({ age: -1, height : -1, physAddress: '' });
    // tslint:disable-next-line: no-construct
    u.changeInfo({ age: -1, height : -1, physAddress: new String() });
    expect(u.physAddress).not.toBe('myAddressNew');
    u.changeInfo({ age: -1, height : -1, physAddress: 'myAddressNew' });
    expect(u.age).not.toBe(180);
    expect(u.height).not.toBe(177);
    u.changeInfo({ age: 180, height : 177, physAddress : "" });
    u.changeInfo({ age: 180, height : 177, physAddress : "" });
})
