import PaginationValidator from '../../../src/app/Validators/PaginationValidator';

describe('PaginationValidator', () => {
  it('methods should exist', async () => {
    expect(PaginationValidator.paginationValidate).toBeTruthy();
  });

  it('should validate a pagination', async () => {
    const pagination = {
      page: 2,
    };
    const response = await PaginationValidator.paginationValidate(pagination);
    expect(response.page).toBe(2);
  });

  it('should have page default value 1', async () => {
    const pagination = {
      page: undefined,
    };
    const response = await PaginationValidator.paginationValidate(pagination);
    expect(response.page).toBe(1);
  });

  it('should have page positive value', async () => {
    const pagination = {
      page: -1,
    };
    await expect(
      PaginationValidator.paginationValidate(pagination)
    ).rejects.toThrow(/page must be greater than or equal to 1/);
  });

  it('sshould have page number value', async () => {
    const pagination = {
      page: 'test',
    };
    await expect(
      PaginationValidator.paginationValidate(pagination)
    ).rejects.toThrow(/page must be a `number` type/);
  });
});
