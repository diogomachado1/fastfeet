import { ObjectSchema, ArraySchema } from 'yup';
import BadRequestError from '../Error/BadRequestError';

class Validator {
  protected async validate(
    schema: ObjectSchema<any> | ArraySchema<ObjectSchema>,
    data
  ): Promise<any> {
    try {
      const response = await schema.validate(data, {
        abortEarly: true,
        stripUnknown: true,
      });
      return response;
    } catch (err) {
      throw new BadRequestError(err.errors[0]);
    }
  }
}

export default Validator;
