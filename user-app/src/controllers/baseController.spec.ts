import supertest from 'supertest';
import { User } from     '../user';
import app from          '../app';
import BaseController from     './baseController';

// const port = 8080;
const port = process.env.PORT || 1337;
const server = app.listen(port);
// avoid jest open handle error
// beforeAll tests are run call server (depends on the program logic)
afterAll(async () => {
    server.close();
});

it('#BaseController Gall home', async done => {
    const endpoint: string = '/';
    const users: User[] = [];
    const baseController = new BaseController(users);
    app.use('/', baseController.router);
    const resGet = await supertest(server).get(endpoint).send();
    expect(resGet.status).toBe(200);
    const resPost = await supertest(server).post(endpoint).send();
    expect(resPost.status).toBe(200);
    done();
})

it('#BaseController Get users', async done => {
    // jest.setTimeout(30000);
    const endpoint: string = '/users';
    const users: User[] = [new User('U1'), new User('U2'), new User('U3') ];
    const baseController = new BaseController(users);
    app.use('/', baseController.router);
    const req = supertest(server);
    const response = await req.get(endpoint);
    expect(response.status).toBe(200);
    // expect(response.body.message).toBe('pass!')
    done();
})

// See
// https://stackoverflow.com/questions/46645616/how-to-test-path-parameters-of-a-get-request-with-nodejss-supertest
it('#BaseController Get users: by name', async done => {
    const endpoint: string = '/users/';
    const users: User[] = [new User('U1'), new User('U2'), new User('U3') ];
    const baseController = new BaseController(users);
    app.use('/', baseController.router);
    const resOk = await supertest(server).get(endpoint + 'U2/').send({name: 'U2'});
    if (baseController.getUser(users, 'U2')) {
        expect(resOk.status).toBe(200);
    }
    const resNoSuchUser = await supertest(server).get(endpoint + 'Petras/').send({name: 'Petras'});
    if (!baseController.getUser(users, 'Petras')) {
        expect(resNoSuchUser.status).toBe(404);
    }
    done();
})

it('#BaseController Get users: empty database', async done => {
    const endpoint: string = '/users';
    const users: User[] = [];
    const baseController = new BaseController(users);
    // app.use(request.get())
    app.use('/', baseController.router);
    const req = supertest(server);
    const response = await req.get(endpoint);
    expect(response.status).toBe(404);
    // expect(response.body.message).toBe('pass!')
    done();
})

it('#BaseController Should create user', async done => {
    const endpoint: string = '/users/';
    const resOk = await supertest(server).post(endpoint).send({name: 'Petras'});
    expect(resOk.status).toBe(200);
    const resDuplicate = await supertest(server).post(endpoint).send({name: 'Petras'});
    expect(resDuplicate.status).toBe(400);
    const resNoName = await supertest(server).post(endpoint).send({name: ''});
    expect(resNoName.status).toBe(404);
    done();
})

it('#BaseController Should delete user', async done => {
    const endpoint: string = '/users/';
    const users: User[] = [new User('U1'), new User('U2'), new User('U3') ];
    const baseController = new BaseController(users);
    app.use('/', baseController.router);
    const resOk = await supertest(server).delete(endpoint).send({name: 'U1'});
    expect(resOk.status).toBe(200);
    const resNoSuchUser = await supertest(server).delete(endpoint).send({name: 'Petras'});
    expect(resNoSuchUser.status).toBe(404);
    const resNoName = await supertest(server).delete(endpoint).send({name: ''});
    expect(resNoName.status).toBe(404);
    done();
})