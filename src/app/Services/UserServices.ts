import UserValidator from '../Validators/UserValidator';
import User from '../models/User';
import BadRequestError from '../Error/BadRequestError';
import JwtServices from './JwtServices';

interface CreateSessionPayload {
  email: string;
  password: string;
}
interface CreateSessionReponse {
  user: {
    id: number;
    email: string;
    name: string;
  };
  token: string;
}

class UserServices {
  async createSession(
    payload: CreateSessionPayload
  ): Promise<CreateSessionReponse> {
    const { email, password } = await UserValidator.sessionValidate(payload);

    const user = await User.getByEmail(email);
    if (!user || !(await user.checkPassword(password))) {
      throw new BadRequestError('wrong email or password');
    }
    const { id, name } = user;

    const token = JwtServices.createToken(id);

    return { user: { id, email, name }, token };
  }
}

export default new UserServices();
