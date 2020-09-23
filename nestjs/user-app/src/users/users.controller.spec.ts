import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

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

  describe('getAllUsers', () => {
    const response = 'gets all users';
    it('should get all users', async () => {
      jest.spyOn(service, 'getAllUsers').mockImplementation(() => response);
      expect(controller.getAllUsers()).toBe(response);
    });
  });

  describe('getOneUser', () => {
    const param = 'myid';
    const response = 'gets user by id myid';
    it('should get one user', async () => {
      jest.spyOn(service, 'getOneUser').mockImplementation(() => response);
      expect(controller.getOneUser(param)).toBe(response);
    });
  });

  describe('createUser', () => {
    const user = {name: 'uname', age: 15, email: 'uname@gmail.com'};
    const response = `creates user: name ${user.name} age ${user.age} email ${user.email}`;
    it('should get one user', async () => {
      jest.spyOn(service, 'createUser').mockImplementation(() => response);
      expect(controller.createUser(user)).toBe(response);
    });
  });
});
