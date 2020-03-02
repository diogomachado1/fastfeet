import {string, object} from 'yup';
import Validator from './Validator';
class RecipientValidator extends Validator {
  private storeSchema;
  private updateSchema;
  constructor(){
    super();
    this.storeSchema = object().shape({
      name: string().required(),
      street: string().required(),
      number: string().required(),
      addressComplement: string().required(),
      city: string().required(),
      state: string().required(),
      cep: string().required(),
    });
    this.updateSchema = object().shape({
      name: string(),
      street: string(),
      number: string(),
      addressComplement: string(),
      city: string(),
      state: string(),
      cep: string(),
    });
  }

  async storeValidate(data){
    return this.validate(this.storeSchema, data)
  }
  async updateValidate(data){
    return this.validate(this.updateSchema, data)
  }
}

export default new RecipientValidator()
