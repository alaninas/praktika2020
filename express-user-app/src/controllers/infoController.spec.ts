import supertest from 'supertest';
import { User } from     '../user/user';
import app from          '../app';
import InfoController from './infoController';
import ControllerTestUtility from './controllerTestUtility';

const port = 3130;
const server = app.listen(port);
afterAll(async () => {
    server.close();
})

it('#InfoController Should create info', async done => {
    const endpoint: string = '/users/info/';
    app.use('/', (new InfoController([ new User('U1') ])).router);
    try {
        const resDouble = await supertest(server).post(endpoint).send({name: 'U1', age: -1});
        expect(resDouble.status).toBe(401);
        const resOk = await supertest(server).post(endpoint).send({name: 'U1', age: 123, height: 100, physAddress: 'myAddress'});
        const resOk2 = await supertest(server).post(endpoint).send({name: 'U1', height: 100, physAddress: 'myAddress'});
        expect(resOk.status).toBe(200);
        expect(resOk2.status).toBe(200);
        const resNoName = await supertest(server).post(endpoint).send({});
        expect(resNoName.status).toBe(400);
        const resNoSuchUser = await supertest(server).post(endpoint).send({name: 'NoSuchUser'});
        expect(resNoSuchUser.status).toBe(404);
    } catch (error) {
        ControllerTestUtility.printErrorToConsole({ port, error });
    }
    done();
})

it('#InfoController Should change info', async done => {
    const endpoint: string = '/users/info/';
    app.use('/', (new InfoController([ new User('U1') ])).router);
    try {
        const resDouble = await supertest(server).put(endpoint).send({name: 'U1', age: -1});
        expect(resDouble.status).toBe(401);
        const resOk = await supertest(server).put(endpoint).send({name: 'U1', age: 123, height: 100, physAddress: 'myAddress'});
        const resOk2 = await supertest(server).put(endpoint).send({name: 'U1', height: 100, physAddress: 'myAddress'});
        expect(resOk.status).toBe(200);
        expect(resOk2.status).toBe(200);
        const resNoName = await supertest(server).put(endpoint).send({});
        expect(resNoName.status).toBe(400);
        const resNoSuchUser = await supertest(server).put(endpoint).send({name: 'NoSuchUser'});
        expect(resNoSuchUser.status).toBe(404);
    } catch (error) {
        ControllerTestUtility.printErrorToConsole({ port, error });
    }
    done();
})