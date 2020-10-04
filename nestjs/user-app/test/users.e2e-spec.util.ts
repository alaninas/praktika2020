export  function createPersonModelMock() {
    return {
        find: jest.fn(),
        findOne: jest
          .fn(),
          // .mockImplementationOnce(() => '')
          // .mockImplementationOnce(() => 'name'),
        findById: jest.fn(),
        aggregate: jest.fn(() => 'someLookUp'),
        save: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findOneAndDelete: jest.fn(),
    }
};

export function createMovieModelMock() {
    return {
        find: jest.fn(),
        save: jest.fn(),
    }
};

export const authService = { login: (data: any) => data };
  
export const userLogin = {
    name: "name",
    password: "pswd",
    _id: "123abc123123123123123123",
    passwordConfirm: "pswd",
};