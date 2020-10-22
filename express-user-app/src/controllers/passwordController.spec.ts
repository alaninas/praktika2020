import supertest from 'supertest';
import { User } from     '../user/user';
import app from          '../app';
import PasswordController from './passwordController';
import ControllerTestUtility from './controllerTestUtility';

const port = 4130;
const server = app.listen(port);
afterAll(async () => {
    server.close();
})

it('#PasswordController Should create password', async done => {
    const endpoint: string = '/users/pswd/';
    app.use('/', (new PasswordController([ new User('U1') ])).router);
    try {
        const resOk = await supertest(server).post(endpoint).send({name: 'U1',  password: 'Pswd', repeat: 'Pswd'});
        expect(resOk.status).toBe(200);
        const resDouble = await supertest(server).post(endpoint).send({name: 'U1', password: 'Pswd', repeat: 'Pswd'});
        expect(resDouble.status).toBe(401);
        const resNoName = await supertest(server).post(endpoint).send({});
        expect(resNoName.status).toBe(400);
        const resNoSuchUser = await supertest(server).post(endpoint).send({name: 'NoSuchUser'});
        expect(resNoSuchUser.status).toBe(404);
    } catch (error) {
        ControllerTestUtility.printErrorToConsole({ port, error });
    }
    done();
})

it('#PasswordController Should change password', async done => {
    const endpoint: string = '/users/pswd/';
    app.use('/', (new PasswordController([ new User('U1') ])).router);
    try {
        const resOk = await supertest(server).put(endpoint).send({name: 'U1',  password: 'Pswd'});
        expect(resOk.status).toBe(200);
        const resDouble = await supertest(server).put(endpoint).send({name: 'U1', password: 'Pswd'});
        expect(resDouble.status).toBe(401);
        const resNoName = await supertest(server).put(endpoint).send({});
        expect(resNoName.status).toBe(400);
        const resNoSuchUser = await supertest(server).put(endpoint).send({name: 'NoSuchUser'});
        expect(resNoSuchUser.status).toBe(404);
    } catch (error) {
        ControllerTestUtility.printErrorToConsole({ port, error });
    }
    done();
})