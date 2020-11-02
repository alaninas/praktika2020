export default interface UserInterface {
    firstname?: string | undefined;
    lastname?: string | undefined;
    fullname?: string | undefined;
    age?: number;
    country?: string;
    url?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
    houseNumber?: number | undefined;
    street?: string | undefined;
    city?: string | undefined;
    zipCode?: number | undefined;
    address?: string;
    friends?: Array<string>;
    movies?: Array<string>;
    _id?: string;
}
