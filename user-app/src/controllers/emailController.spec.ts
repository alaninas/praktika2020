import supertest from 'supertest';
import { User } from     '../user/user';
import app from          '../app';
import EmailController from './emailController';
import ControllerTestUtility from './controllerTestUtility';

const port = 2130;
const server = app.listen(port);
afterAll(async () => {
    server.close();
})

it('#EmailController Should create email', async done => {
    const endpoint: string = '/users/email/';
    app.use('/', (new EmailController([ new User('U1') ])).router);
    try {
        const resOk = await supertest(server).post(endpoint).send({name: 'U1', email: 'mail.com'});
        expect(resOk.status).toBe(200);
        const resDouble = await supertest(server).post(endpoint).send({name: 'U1', email: 'mail.com'});
        expect(resDouble.status).toBe(400);
        const resNoName = await supertest(server).post(endpoint).send({});
        expect(resNoName.status).toBe(404);
        const resNoSuchUser = await supertest(server).post(endpoint).send({name: 'NoSuchUser'});
        expect(resNoSuchUser.status).toBe(404);
    } catch (error) {
        ControllerTestUtility.printErrorToConsole({ port, error });
    }
    done();
})

it('#EmailController Should change email', async done => {
    const endpoint: string = '/users/email/';
    app.use('/', (new EmailController([ new User('U1') ])).router);
    try {
        const resOk = await supertest(server).put(endpoint).send({name: 'U1', email: 'mail2.com'});
        expect(resOk.status).toBe(200);
        const resDouble = await supertest(server).put(endpoint).send({name: 'U1', email: 'mail2.com'});
        expect(resDouble.status).toBe(400);
        const resNoName = await supertest(server).put(endpoint).send({});
        expect(resNoName.status).toBe(404);
        const resNoSuchUser = await supertest(server).put(endpoint).send({name: 'NoSuchUser'});
        expect(resNoSuchUser.status).toBe(404);
    } catch (error) {
        ControllerTestUtility.printErrorToConsole({ port, error });
    }
    done();
})