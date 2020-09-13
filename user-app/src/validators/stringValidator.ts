class StringValidator {
    // tslint:disable-next-line: ban-types
    isEmpty(str: string | String | undefined) {
        return (!str || str.length === 0 || str.trim().length === 0);
    }
    isAllLetters(str: string) {
        return /^[A-Za-z]+$/.test(str);
    }
    isEmail(str: string) {
        const pattern = new RegExp("^[^\W][a-zA-Z0-9\W]*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
        return pattern.test(str);
    }
    isAddress(str: string) {
        const pattern = new RegExp("^[a-zA-Z]+\W+(\w+?[0-9-]+\w+?)+([\s\.,-\/|\\]+)?(\w+?[0-9-]+\w+?)$");
        return pattern.test(str);
    }
    isPassword(str: string) {
        const patter = new RegExp("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/");
        return patter.test(str);
    }
    public newPassword({ oldValue, pwd, repeat }: { oldValue: string | undefined; pwd: string; repeat: string; }) {
        let result = 0;
        if (!oldValue) {
            if (pwd === repeat && !this.isEmpty(pwd)) {
                // TODO: add constraint on password format
                result = 1;
            } else {
                throw new Error('Passwords do not match');
            }
        } else {
            throw new Error('Password already set');
        }
        return result;
    }
    public updatePassword({ oldValue, newValue }: { oldValue: string | undefined; newValue: string; }) {
        let result = 0;
        if (oldValue !== newValue) {
            // TODO: add constraint on password format
            if (!this.isEmpty(newValue)) {
                // TODO: add constraint on password format
                result = 1;
            } else {
                // throw new Error({"error": 404,"message":"bb"});
                throw new Error('Empty password provided');
            }
        } else {
            throw new Error('New password matches the old');
        }
        return result;
    }
    public newEmail({ oldValue, newValue }: { oldValue: string | undefined; newValue: string; }) {
        let result = 0;
        if (this.isEmpty(oldValue)) {
            if (!this.isEmpty(newValue)) {
                // TODO: add constraint on password format
                result = 1;
            }
        } else {
            throw new Error('Email already set');
        }
        return result;
    }
    public updateEmail({ oldValue, newValue }: { oldValue: string | undefined; newValue: string; }) {
        let result = 0;
        if (oldValue !== newValue) {
            // TODO: add constraint on email format
            result = 1;
        } else {
            throw new Error('New email matches the old');
        }
        return result;
    }
    // tslint:disable-next-line: ban-types
    public newAddress({ oldValue, newValue }: { oldValue: string | String | undefined; newValue: string | String; }) {
        let result = 0;
        if (!oldValue) {
            if (!this.isEmpty(newValue)) {
                // TODO: add constraint on password format
                result = 1;
            }
        }
        // } else {
            // throw new Error('Email already set');
        // }
        return result;
    }
    // tslint:disable-next-line: ban-types
    public updateAddress({ oldValue, newValue }: { oldValue: string | String | undefined; newValue: string | String; }) {
        let result = 0;
        if (oldValue !== newValue) {
            // TODO: add constraint on password format
            if (!this.isEmpty(newValue)) {
                // TODO: add constraint on password format
                result = 1;
            }
        }
        return result;
    }
}
export default StringValidator;