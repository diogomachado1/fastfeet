import File from '../../../src/app/models/File';
import FileService from '../../../src/app/Services/FileService';
import factory from '../../factories';

jest.mock('../../../src/app/models/File');

const mFile = File as jest.Mocked<typeof File>;

mFile.create = jest.fn(mFile.create);
mFile.findByPk = jest.fn(mFile.findByPk);
describe('FileService', () => {
  it('methods should exist', async () => {
    expect(FileService.create).toBeTruthy();
    expect(FileService.verifyAndGetFile).toBeTruthy();
  });
  it('should create File', async () => {
    const file = (await factory.attrs('File')) as File;
    // @ts-ignore
    mFile.create.mockResolvedValue(file);
    const response = await FileService.create(file);

    expect(mFile.create).toHaveBeenCalledTimes(1);
    expect(response).toBe(file);
  });

  it('should verifyAndGetOne File', async () => {
    const file = (await factory.attrs('File', {
      id: 1,
    })) as File;
    mFile.findByPk.mockResolvedValue(file);
    const response = await FileService.verifyAndGetFile(1);
    expect(mFile.findByPk).toHaveBeenCalledTimes(1);
    expect(response).toBe(file);
  });

  it('should get error when not found File in verifyAndGetOne', async () => {
    mFile.findByPk.mockResolvedValue(undefined);
    await expect(FileService.verifyAndGetFile(1)).rejects.toThrow(
      /Image not found/
    );
  });
});
