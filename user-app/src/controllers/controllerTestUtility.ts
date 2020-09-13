// import { User } from     '../user';
// import express from 'express';
// import BaseController from     './baseController';
// import UserController from     './userController';
// import EmailController from    './emailController';
// import InfoController from     './infoController';
// import PasswordController from './passwordController';

class ControllerTestUtility {
    public static printErrorToConsole({ port, error }: { port: number; error: any; }) {
        // tslint:disable-next-line: no-console
        console.log('' + port + '\n' + error) // Failure!
    }
}

export default ControllerTestUtility;
