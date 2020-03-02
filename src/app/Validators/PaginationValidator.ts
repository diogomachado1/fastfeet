import { number, object } from 'yup';
import Validator from './Validator';
import { Pagination } from '../utils/Interfaces';

class PaginationValidator extends Validator {
  private paginationSchema;

  constructor() {
    super();
    this.paginationSchema = object().shape({
      page: number()
        .min(1)
        .default(1),
    });
  }

  async paginationValidate(data): Promise<Pagination> {
    return this.validate(this.paginationSchema, data);
  }
}

export default new PaginationValidator();
