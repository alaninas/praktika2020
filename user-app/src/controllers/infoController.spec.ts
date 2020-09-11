import supertest from 'supertest';
import { User } from     '../user';
import app from          '../app';
import InfoController from './infoController';

// const port = 8080;
const port = process.env.PORT || 8337;
const server = app.listen(port);
// avoid jest open handle error
// beforeAll tests are run call server (depends on the program logic)
afterAll(async () => {
    server.close();
})

it('#InfoController Should create info', async done => {
    const endpoint: string = '/users/info/';
    const users: User[] = [new User('U1'), new User('U2'), new User('U3') ];
    const emailController = new InfoController(users);
    app.use('/', emailController.router);
    const resOk = await supertest(server).post(endpoint).send({name: 'U1', age: 123, height: 100, physAddress: 'myAddress'});
    const reqUser = emailController.getUser(users, 'U1');
    if (reqUser) {
        reqUser.addInfo({age: 123, height: 100, physAddress: 'myAddress'});
        expect(resOk.status).toBe(200);
        const resOkDouble = await supertest(server).post(endpoint).send({name: 'U1'});
    }
    const resNoName = await supertest(server).post(endpoint).send({some: 'shit'});
    expect(resNoName.status).toBe(400);
    const resNoSuchUser = await supertest(server).post(endpoint).send({name: 'NoSuchUser'});
    expect(resNoSuchUser.status).toBe(404);
    done();
})

it('#InfoController Should change info', async done => {
    const endpoint: string = '/users/info/';
    const users: User[] = [new User('U1'), new User('U2'), new User('U3') ];
    // users[0].addEmail('');
    const emailController = new InfoController(users);
    app.use('/', emailController.router);
    const resOk = await supertest(server).put(endpoint).send({name: 'U1', age: 123, height: 100, physAddress: 'myAddress'});
    const reqUser = emailController.getUser(users, 'U1');
    if (reqUser) {
        reqUser.changeInfo({age: 123, height: 100, physAddress: 'myAddress'});
        expect(resOk.status).toBe(200);
        const resOkDouble = await supertest(server).put(endpoint).send({name: 'U1'});
    }
    const resNoName = await supertest(server).put(endpoint).send({some: 'shit'});
    expect(resNoName.status).toBe(400);
    const resNoSuchUser = await supertest(server).put(endpoint).send({name: 'NoSuchUser'});
    expect(resNoSuchUser.status).toBe(404);
    done();
})