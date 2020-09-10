import supertest from 'supertest';
import { User } from './src/user';
import ListController from './src/controllers/listController';
import server from './src/app';

// https://codewithhugo.com/express-request-response-mocking/
// https://zellwk.com/blog/endpoint-testing/
test("#ListController", () => {
    const users = new ListController();
    users.intializeRoutes();
})

// avoid jest open handle error
// afterAll(async () => {
    // await new Promise(resolve => setTimeout(() => resolve(), 10000));
//   });

it('Gets the test endpoint', async done => {
    // jest.setTimeout(30000);
    const request = supertest(server);
    const response = await request.get('/users');
    expect(response.status).toBe(200);
    // expect(response.body.message).toBe('pass!')
    server.close();
    done();
})
