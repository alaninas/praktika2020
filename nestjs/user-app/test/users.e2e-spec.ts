import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
// import { AppModule } from './../src/app.module';
import { UsersModule } from '../src/users/users.module';
// import { UsersService } from '../src/users/users.service';
import { getModelToken } from '@nestjs/mongoose';

// import { UsersHelper } from '../src/users/users.helper';


function createModelMock() {
  return {
    find: jest.fn(),
    findById: jest.fn()
  }
}

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getModelToken('Person'))
      .useValue(createModelMock())
      .overrideProvider(getModelToken('Movie'))
      .useValue(createModelMock())
      .compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200);
      // .expect('User App running on port 3000');
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
