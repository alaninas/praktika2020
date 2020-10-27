export default interface UserInterface {
    firstname?: string;
    lastname?: string;
    fullname?: string;
    age?: number;
    country?: string;
    url?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
    houseNumber?: number;
    street?: string;
    city?: string;
    zipCode?: number;
    address?: string;
    friends?: Array<string>;
    movies?: Array<string>;
    _id?: string;
}
