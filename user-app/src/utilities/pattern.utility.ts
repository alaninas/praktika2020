// Should extend Errors and print the appropriate messaging
class PatternUtility {
    isFloat(str: string) {
        return /^[-+]?[0-9]+\.[0-9]+$/.test(str);
    }
    isBadNumber(inputNumber: number | undefined) {
        return (!inputNumber || Number.isNaN(inputNumber) || inputNumber < 0);
    }
    // tslint:disable-next-line: ban-types
    isEmpty(str: string | String | undefined) {
        return (!str || str.length === 0 || str.trim().length === 0);
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
}
export default PatternUtility;