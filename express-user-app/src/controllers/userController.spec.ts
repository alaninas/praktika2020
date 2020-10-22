import supertest from 'supertest';
import { User } from     '../user/user';
import app from          '../app';
import UserController from './userController';
import ControllerTestUtility from './controllerTestUtility';

const port = 6030;
const server = app.listen(port);
afterAll(async () => {
    server.close();
})

it('#UserController Should add friend', async done => {
    const endpoint: string = '/users/add-friend';
    const users: User[] = [new User('U1'), new User('U2'), new User('U3') ];
    const userController = new UserController(users);
    app.use('/', userController.router);
    try {
        const resNoNames = await supertest(server).post(endpoint).send({});
        expect(resNoNames.status).toBe(403);
        const resOk = await supertest(server).post(endpoint).send({user: 'U1', friend: 'U3'});
        expect(resOk.status).toBe(200);
        const resNoUser = await supertest(server).post(endpoint).send({user: 'NoUser', friend: 'U3'});
        expect(resNoUser.status).toBe(401);
        const resNoFriend = await supertest(server).post(endpoint).send({user: 'U1', friend: 'NoFriend'});
        expect(resNoFriend.status).toBe(402);
    } catch (error) {
        ControllerTestUtility.printErrorToConsole({ port, error });
    }
    done();
})

it('#UserController Should remove friend', async done => {
    const endpoint: string = '/users/remove-friend';
    const users: User[] = [new User('U1'), new User('U2'), new User('U3') ];
    users[0].addFriend(users[2]);
    const userController = new UserController(users);
    app.use('/', userController.router);
    try {
        const resOk = await supertest(server).post(endpoint).send({user: 'U1', friend: 'U3'});
        expect(resOk.status).toBe(200);
        const resNoUser = await supertest(server).post(endpoint).send({user: 'NoUser', friend: 'U3'});
        expect(resNoUser.status).toBe(401);
        const resNoFriend = await supertest(server).post(endpoint).send({user: 'U1', friend: 'NoFriend'});
        expect(resNoFriend.status).toBe(402);
        const resNoNames = await supertest(server).post(endpoint).send({});
        expect(resNoNames.status).toBe(403);
        const resNotFriends = await supertest(server).post(endpoint).send({user: 'U1', friend: 'U2'});
        expect(resNotFriends.status).toBe(300);
    } catch (error) {
        ControllerTestUtility.printErrorToConsole({ port, error });
    }
    done();
})