import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { getModelToken } from '@nestjs/mongoose';
import { LocalAuthGuard } from '../src/auth/guards/local-auth.guard';
import { AuthService } from '../src/auth/auth.service';
import { UsersController } from '../src/users/users.controller';


function createModelMock() {
  return {
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn()
  }
}

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  const authService = { login: (data: any) => data };
  const userLogin = {
    name: "name",
    password: "pswd",
    _id: "123abc123123123123123123",
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [AuthService, UsersController]
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .overrideProvider(getModelToken('Person'))
      .useValue(createModelMock())
      .overrideProvider(getModelToken('Movie'))
      .useValue(createModelMock())
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();
      
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('users/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/users/auth/login')
      .expect(201).send({name: userLogin.name, password: userLogin.password, _id: userLogin._id})
      .expect(authService.login({name: userLogin.name, password: userLogin.password, _id: userLogin._id}));
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200);
  });

  it('/users/:id (GET) #OK', () => {
    const myId = "123abc123123123123123123";
    return request(app.getHttpServer())
      .get(`/users/${myId}`)
      .expect(200).send({id: myId});
  });

  it('/users/:id (GET) #BadValue', () => {
    const myId = "123";
    return request(app.getHttpServer())
      .get(`/users/${myId}`)
      .expect(400).send({id: myId});
  });
});
