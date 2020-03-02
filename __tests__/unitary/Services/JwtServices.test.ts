import JwtServices from '../../../src/app/Services/JwtServices';

describe('JwtServices', () => {
  it('methods should exist', async () => {
    expect(JwtServices.createToken).toBeTruthy();
    expect(JwtServices.verifyToken).toBeTruthy();
  });
  it('should create token', async () => {
    const token = await JwtServices.createToken(1);

    expect(token).toEqual(expect.any(String));
  });

  it('should verify and decode token', async () => {
    const token = await JwtServices.createToken(1);

    expect(JwtServices.verifyToken(token)).toBe(1);
  });

  it('should throw error when token invalid', async () => {
    const token = await JwtServices.createToken(1);

    expect(() => JwtServices.verifyToken(token + 1)).toThrow(/Unauthorized/);
  });
});
