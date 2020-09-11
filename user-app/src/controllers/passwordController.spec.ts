import express, { request } from 'express';
import bodyParser from 'body-parser';
import supertest from 'supertest';
import { BaseUser } from '../baseUser';
import { User } from     '../user';
import App from          '../app';
import BaseController from     './baseController';
import UserController from     './userController';
import InfoController from     './infoController';
import PasswordController from './passwordController';
import EmailController from    './emailController';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const port = 3030;
// const port = process.env.PORT || 8000;
const server = app.listen(port);
// avoid jest open handle error
// beforeAll tests are run call server (depends on the program logic)
afterAll(async () => {server.close();});

// https://codewithhugo.com/express-request-response-mocking/
// https://zellwk.com/blog/endpoint-testing/
test("#PasswordController", () => {
    const users: User[] = [new User('U1'), new User('U2'), new User('U3') ];
    const list = new PasswordController(users);
    list.intializeRoutes();
})

server.close();