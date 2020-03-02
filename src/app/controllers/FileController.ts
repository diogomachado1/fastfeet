import { Response } from 'express';
import FileService from '../Services/FileService';

class FileController {
  async store(req, res): Promise<Response> {
    const { originalname: name, filename: path } = req.file;
    const file = await FileService.create({ name, path });

    return res.status(201).json(file);
  }
}

export default new FileController();
