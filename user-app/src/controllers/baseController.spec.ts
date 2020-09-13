import supertest from 'supertest';
import { User } from     '../user';
import app from          '../app';
import BaseController from        './baseController';
import ControllerTestUtility from './controllerTestUtility';
import { doesNotMatch } from 'assert';

const port = 1337;
const server = app.listen(port);
afterAll(async () => {
    server.close();
});

it('#BaseController Call home', async done => {
    const endpoint: string = '/';
    try {
        const resGet = await supertest(server).get(endpoint).send();
        expect(resGet.status).toBe(200);
        const resPost = await supertest(server).post(endpoint).send();
        expect(resPost.status).toBe(200);
    } catch (error) {
        ControllerTestUtility.printErrorToConsole({ port, error });
    }
    done();
})

it('#BaseController Get users', async done => {
    const endpoint: string = '/users';
    app.use('/', (new BaseController([])).router);
    try {
        const resEmpty = await supertest(server).get(endpoint);
        expect(resEmpty.status).toBe(404);
        app.use('/', (new BaseController([new User('U1')])).router);
        const resOk = await supertest(server).get(endpoint);
        expect(resOk.status).toBe(200);
    } catch (error) {
        ControllerTestUtility.printErrorToConsole({ port, error });
    }
    done();
})

// See
// https://stackoverflow.com/questions/46645616/how-to-test-path-parameters-of-a-get-request-with-nodejss-supertest
it('#BaseController Get users: by name', async done => {
    const endpoint: string = '/users/';
    const users: User[] = [new User('U1'), new User('U2'), new User('U3') ];
    app.use('/', (new BaseController(users)).router);
    try {
        const resOk = await supertest(server).get(endpoint + 'U2/').send({name: 'U2'});
        expect(resOk.status).toBe(200);
        const resNoSuchUser = await supertest(server).get(endpoint + 'Petras/').send({name: 'Petras'});
        expect(resNoSuchUser.status).toBe(404);
    } catch (error) {
        ControllerTestUtility.printErrorToConsole({ port, error });
    }
    done();
})

it('#BaseController Should create user', async done => {
    const endpoint: string = '/users/';
    try {
        const resOk = await supertest(server).post(endpoint).send({name: 'Petras'});
        expect(resOk.status).toBe(200);
        const resDuplicate = await supertest(server).post(endpoint).send({name: 'Petras'});
        expect(resDuplicate.status).toBe(400);
        const resNoName = await supertest(server).post(endpoint).send({name: ''});
        expect(resNoName.status).toBe(404);
    } catch (error) {
        ControllerTestUtility.printErrorToConsole({ port, error });
    }
    done();
})

it('#BaseController Should delete user', async done => {
    const endpoint: string = '/users/';
    app.use('/', (new BaseController([new User('U1'), new User('U2'), new User('U3') ])).router);
    try {
        const resOk = await supertest(server).delete(endpoint).send({name: 'U1'});
        expect(resOk.status).toBe(200);
        const resNoSuchUser = await supertest(server).delete(endpoint).send({name: 'Petras'});
        expect(resNoSuchUser.status).toBe(404);
        const resNoName = await supertest(server).delete(endpoint).send({name: ''});
        expect(resNoName.status).toBe(404);
    } catch (error) {
        ControllerTestUtility.printErrorToConsole({ port, error });
    }
    done();
})