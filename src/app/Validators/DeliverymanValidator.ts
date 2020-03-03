import { string, object, number } from 'yup';
import Validator from './Validator';
import Deliveryman from '../models/Deliveryman';

class DeliverymanValidator extends Validator {
  private storeSchema;

  private updateSchema;

  constructor() {
    super();
    this.storeSchema = object().shape({
      name: string().required(),
      avatarId: number(),
      email: string().required(),
    });
    this.updateSchema = object().shape({
      name: string(),
      avatarId: number(),
      email: string(),
    });
  }

  async storeValidate(data): Promise<Deliveryman> {
    return this.validate(this.storeSchema, data);
  }

  async updateValidate(data): Promise<Deliveryman> {
    return this.validate(this.updateSchema, data);
  }
}

export default new DeliverymanValidator();
