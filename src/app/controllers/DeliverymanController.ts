import { Response } from 'express';
import FastFeetReq from '../utils/Interfaces';
import DeliverymanService from '../Services/DeliverymanService';

class DeliverymanController {
  async index(req: FastFeetReq, res: Response): Promise<Response> {
    const reponse = await DeliverymanService.getMany(req.query.page);

    return res.json(reponse);
  }

  async show(req: FastFeetReq, res: Response): Promise<Response> {
    const reponse = await DeliverymanService.verifyAndGetOne(req.params.id);

    return res.status(200).json(reponse.get());
  }

  async store(req: FastFeetReq, res: Response): Promise<Response> {
    const reponse = await DeliverymanService.create(req.body);

    return res.status(201).json(reponse);
  }

  async update(req: FastFeetReq, res: Response): Promise<Response> {
    const reponse = await DeliverymanService.update(req.body, req.params.id);

    return res.json(reponse);
  }

  async delete(req: FastFeetReq, res: Response): Promise<Response> {
    await DeliverymanService.delete(req.params.id);

    return res.status(204).send();
  }
}
export default new DeliverymanController();
