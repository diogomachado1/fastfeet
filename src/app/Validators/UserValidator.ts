import { string, object } from 'yup';
import Validator from './Validator';
import User from '../models/User';

class RecipientValidator extends Validator {
  private sessionSchema;

  constructor() {
    super();
    this.sessionSchema = object().shape({
      email: string()
        .email()
        .required(),
      password: string().required(),
    });
  }

  async sessionValidate(data): Promise<User> {
    return this.validate(this.sessionSchema, data);
  }
}

export default new RecipientValidator();
