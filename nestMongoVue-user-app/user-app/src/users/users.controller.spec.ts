import { Test, TestingModule } from '@nestjs/testing';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// import { Person } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  // let personModel: Model<Person>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).compile();
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // how can i return the array of users in my DB ?
  // second time check the function for correctness ?
  // describe('getAllUsers', () => {
    // const response = new Promise<Person>({resolve: new Person(), reject: any});
    // it('should get all users', async () => {
      // jest.spyOn(service, 'getAllUsers').mockImplementation(() => response);
      // expect(controller.getAllUsers()).toBe(response);
    // });
  // });

  // describe('getOneUser', () => {
    // const param = 'myid';
    // const response = 'gets user by id myid';
    // it('should get one user', async () => {
      // jest.spyOn(service, 'getOneUser').mockImplementation(() => response);
      // expect(controller.getOneUser(param)).toBe(response);
    // });
  // });

  // describe('createUser', () => {
    // const user = {name: 'uname', age: 15, email: 'uname@gmail.com'};
    // const response = `creates user: name ${user.name} age ${user.age} email ${user.email}`;
    // it('should get one user', async () => {
      // jest.spyOn(service, 'createUser').mockImplementation(() => response);
      // expect(controller.createUser(user)).toBe(response);
    // });
  // });
});
