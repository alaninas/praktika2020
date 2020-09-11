import supertest from 'supertest';
import { User } from     '../user';
import app from          '../app';
import EmailController from './emailController';

// const port = 8080;
const port = process.env.PORT || 4337;
const server = app.listen(port);
// avoid jest open handle error
// beforeAll tests are run call server (depends on the program logic)
afterAll(async () => {
    server.close();
})

it('#EmailController Should create email', async done => {
    const endpoint: string = '/users/email/';
    const users: User[] = [new User('U1'), new User('U2'), new User('U3') ];
    const emailController = new EmailController(users);
    app.use('/', emailController.router);
    const resOk = await supertest(server).post(endpoint).send({name: 'U1'});
    const reqUser = emailController.getUser(users, 'U1');
    if (reqUser) {
        reqUser.addEmail('mail.com');
        expect(resOk.status).toBe(400);
    }
    const resNoName = await supertest(server).post(endpoint).send({some: 'shit'});
    expect(resNoName.status).toBe(404);
    const resNoSuchUser = await supertest(server).post(endpoint).send({name: 'NoSuchUser'});
    expect(resNoSuchUser.status).toBe(404);
    done();
})

it('#EmailController Should change email', async done => {
    const endpoint: string = '/users/email/';
    const users: User[] = [new User('U1'), new User('U2'), new User('U3') ];
    // users[0].addEmail('');
    const emailController = new EmailController(users);
    app.use('/', emailController.router);
    const resOk = await supertest(server).put(endpoint).send({name: 'U1', mail: 'mail.com'});
    const reqUser = emailController.getUser(users, 'U1');
    if (reqUser) {
        reqUser.changeEmail('mail.com');
        expect(resOk.status).toBe(400);
    }
    const resNoName = await supertest(server).put(endpoint).send({name: ''});
    expect(resNoName.status).toBe(404);
    const resNoSuchUser = await supertest(server).put(endpoint).send({name: 'NoSuchUser'});
    expect(resNoSuchUser.status).toBe(404);
    done();
})