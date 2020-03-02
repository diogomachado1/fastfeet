import { Response } from 'express';
import FastFeetReq from '../utils/Interfaces';
import RecipientServices from '../Services/RecipientServices';

class RecipientsController {
  async index(req: FastFeetReq, res: Response): Promise<Response> {
    const reponse = await RecipientServices.getMany(req.query.page);

    return res.json(reponse);
  }

  async show(req: FastFeetReq, res: Response): Promise<Response> {
    const reponse = await RecipientServices.verifyAndGetOne(req.params.id);

    return res.status(200).json(reponse.get());
  }

  async store(req: FastFeetReq, res: Response): Promise<Response> {
    const reponse = await RecipientServices.create(req.body);

    return res.json(reponse);
  }

  async update(req: FastFeetReq, res: Response): Promise<Response> {
    const reponse = await RecipientServices.update(req.body, req.params.id);

    return res.json(reponse);
  }

  async delete(req: FastFeetReq, res: Response): Promise<Response> {
    await RecipientServices.delete(req.params.id);

    return res.status(204).send();
  }
}
export default new RecipientsController();
