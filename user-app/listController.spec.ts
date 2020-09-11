import express, { request } from 'express';
import bodyParser from 'body-parser';
import supertest from 'supertest';
import { User } from './src/user';
import ListController from './src/controllers/listController';
import App from './src/app';
import FriendController from   './src/controllers/friendController';
import InfoController from     './src/controllers/infoController';
import PasswordController from './src/controllers/passwordController';
import EmailController from    './src/controllers/emailController';
import { Friend } from         './src/friend';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const port = 3030;
// const port = process.env.PORT || 1337;
const server = app.listen(port);

// https://codewithhugo.com/express-request-response-mocking/
// https://zellwk.com/blog/endpoint-testing/
test("#ListController", () => {
    const users: Friend[] = [new Friend('U1'), new Friend('U2'), new Friend('U3') ];
    const list = new ListController(users);
    list.intializeRoutes();
})

// avoid jest open handle error
// before every test call server ?
afterAll(async () => {
 server.close();
});

it('Gets the test endpoint1', async done => {
    // jest.setTimeout(30000);
    const users: Friend[] = [new Friend('U1'), new Friend('U2'), new Friend('U3') ];
    const list = new ListController(users);
    app.use('/', list.router);
    const req = supertest(server);
    const response = await req.get('/users');
    expect(response.status).toBe(200);
    // expect(response.body.message).toBe('pass!')
    // app.close();
    // server.close();
    done();
})

it('Should create user', async () => {
    const res = await supertest(server).post('/users/').send({name: 'Petras'});
    expect(res.status).toBe(200);
})

it('Gets the test endpoint2', async done => {
    const users: Friend[] = [];
    const list = new ListController(users);
    // app.use(request.get())
    app.use('/', list.router);
    const req = supertest(server);
    const response = await req.get('/users');
    expect(response.status).toBe(404);
    // expect(response.body.message).toBe('pass!')
    done();
})
