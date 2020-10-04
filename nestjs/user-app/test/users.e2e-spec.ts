import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { getModelToken } from '@nestjs/mongoose';
import { LocalAuthGuard } from '../src/auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../src/auth/guards/jwt-auth.guard';
import { AuthService } from '../src/auth/auth.service';
import { UsersController } from '../src/users/users.controller';
import { createPersonModelMock, createMovieModelMock, userLogin, authService } from './users.e2e-spec.util';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [AuthService, UsersController]
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .overrideProvider(getModelToken('Person'))
      .useValue(createPersonModelMock())
      .overrideProvider(getModelToken('Movie'))
      .useValue(createMovieModelMock())
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(JwtAuthGuard)
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
      .expect(201).send(userLogin)
      .expect(authService.login(userLogin));
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200);
  });

  it('/users/:id (GET) #OK', () => {
    return request(app.getHttpServer())
      .get(`/users/${userLogin._id}`)
      .expect(200).send({id: userLogin._id});
  });

  it('/users/:id (GET) #BadValue', () => {
    const myId = "123";
    return request(app.getHttpServer())
      .get(`/users/${myId}`)
      .expect(400).send({id: myId});
  });

  it('/users/:id/friends (GET)', () => {
    return request(app.getHttpServer())
      .get(`/users/${userLogin._id}/friends`)
      .expect(200).send({id: userLogin._id});
  });

  it('/users/:id/movies (GET)', () => {
    return request(app.getHttpServer())
      .get(`/users/${userLogin._id}/movies`)
      .expect(200).send({id: userLogin._id});
  });

  it('/users (POST)', async () => {
    await request(app.getHttpServer())
      .post(`/users`)
      .expect(201).send(userLogin);
      // .expect(400).send(userLogin);
  });

  it('/users/friends/add (POST)', () => {
    return request(app.getHttpServer())
      .post(`/users/friends/add`)
      .expect(201).send({id: userLogin._id, friend: userLogin._id});
  });

  it('/users/friends/remove (POST)', () => {
    return request(app.getHttpServer())
      .post(`/users/friends/remove`)
      .expect(201).send({id: userLogin._id, friend: userLogin._id});
  });

  // doesn't work this way, need an old user.password to test upon
  // it('/users (PUT)', () => {
    // return request(app.getHttpServer())
      // .put(`/users`)
      // .expect(201).send(userLogin);
  // });

  it('/users (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/users`)
      .expect(404).send({id: userLogin._id});
  });
});
