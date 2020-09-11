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

const port = 8080;
// const port = process.env.PORT || 1337;
const server = app.listen(port);

// https://codewithhugo.com/express-request-response-mocking/
// https://zellwk.com/blog/endpoint-testing/
test("#BaseController", () => {
    const users: User[] = [new User('U1'), new User('U2'), new User('U3') ];
    const list = new BaseController(users);
    list.intializeRoutes();
})

// avoid jest open handle error
// beforeAll tests are run call server (depends on the program logic)
afterAll(async () => {
 server.close();
});

it('Gets the test endpoint1', async done => {
    // jest.setTimeout(30000);
    const users: User[] = [new User('U1'), new User('U2'), new User('U3') ];
    const list = new BaseController(users);
    app.use('/', list.router);
    const req = supertest(server);
    const response = await req.get('/users');
    expect(response.status).toBe(200);
    // expect(response.body.message).toBe('pass!')
    // app.close();
    // server.close();
    done();
})

it('Should create user', async done => {
    const res = await supertest(server).post('/users/').send({name: 'Petras'});
    expect(res.status).toBe(200);
    done();
})

it('Gets the test endpoint2', async done => {
    const users: User[] = [];
    const list = new BaseController(users);
    // app.use(request.get())
    app.use('/', list.router);
    const req = supertest(server);
    const response = await req.get('/users');
    expect(response.status).toBe(404);
    // expect(response.body.message).toBe('pass!')
    done();
})

server.close();
