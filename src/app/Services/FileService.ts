import NotFoundError from '../Error/NotFoundError';
import File from '../models/File';

class FileServices {
  async verifyAndGetFile(id): Promise<File> {
    const file = await File.findByPk(id);
    if (!file) throw new NotFoundError('Image');
    return file;
  }

  async create(data): Promise<File> {
    return File.create(data);
  }
}

export default new FileServices();
