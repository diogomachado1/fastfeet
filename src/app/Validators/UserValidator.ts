import {string, object} from 'yup';
import Validator from './Validator';
class RecipientValidator extends Validator {
  private sessionSchema;
  constructor(){
    super();
    this.sessionSchema =  object().shape({
      email: string()
        .email()
        .required(),
      password: string().required(),
    });
  }

  async sessionValidate(data){
    return this.validate(this.sessionSchema, data)
  }
}

export default new RecipientValidator()
