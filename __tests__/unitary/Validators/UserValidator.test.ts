import UserValidator from '../../../src/app/Validators/UserValidator';

import factory from '../../factories';

describe('UserValidator', () => {
  it('methods should exist', async () => {
    expect(UserValidator.sessionValidate).toBeTruthy();
  });

  it('should have email when create a session', async () => {
    const user = await factory.attrs('User', {
      email: undefined,
    });
    await expect(UserValidator.sessionValidate(user)).rejects.toThrow(
      /email is a required field./
    );
  });

  it('should have password when create a session', async () => {
    const user = await factory.attrs('User', {
      password: undefined,
    });
    await expect(UserValidator.sessionValidate(user)).rejects.toThrow(
      /password is a required field./
    );
  });
});
