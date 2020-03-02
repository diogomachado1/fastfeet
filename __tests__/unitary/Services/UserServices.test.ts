import bcrypt from 'bcryptjs';
import User from '../../../src/app/models/User';
import UserServices from '../../../src/app/Services/UserServices';
import UserValidator from '../../../src/app/Validators/UserValidator';
import JwtServices from '../../../src/app/Services/JwtServices';

jest.mock('../../../src/app/Validators/UserValidator');

jest.mock('../../../src/app/models/User');

const mUser = User as jest.Mocked<typeof User>;
const mUserValidator = UserValidator as jest.Mocked<typeof UserValidator>;

// @ts-ignore
mUser.findOne = jest.fn(user => user);
mUserValidator.sessionValidate = jest.fn(mUserValidator.sessionValidate);

describe('UserServices', () => {
  it('methods should exist', async () => {
    expect(UserServices.createSession).toBeTruthy();
  });
  it('should create session', async () => {
    const user = {
      id: 1,
      name: 'Distribuidora FastFeet',
      email: 'admin@fastfeet.com',
      password_hash: bcrypt.hashSync('123456', 8),
      checkPassword: mUser.prototype.checkPassword,
    };
    mUser.findOne.mockResolvedValue(user as User);
    const response = await UserServices.createSession({
      email: 'admin@fastfeet.com',
      password: '123456',
    });

    expect(mUserValidator.sessionValidate).toHaveBeenCalledTimes(1);
    expect(JwtServices.verifyToken(response.token)).toBe(1);
  });

  it('should not create session when wrong email', async () => {
    mUser.findOne.mockResolvedValue(undefined);
    const createSession = UserServices.createSession({
      email: 'admin@fastfeett.com',
      password: '123456',
    });

    await expect(createSession).rejects.toThrow(/wrong email or password./);
  });

  it('should not create session when wrong password', async () => {
    const user = {
      id: 1,
      name: 'Distribuidora FastFeet',
      email: 'admin@fastfeet.com',
      password_hash: bcrypt.hashSync('123456', 8),
      checkPassword: mUser.prototype.checkPassword,
    };
    mUser.findOne.mockResolvedValue(user as User);
    const createSession = UserServices.createSession({
      email: 'admin@fastfeet.com',
      password: '1234567',
    });

    await expect(createSession).rejects.toThrow(/wrong email or password./);
  });
});
