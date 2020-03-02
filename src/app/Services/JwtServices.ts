import jwt from 'jsonwebtoken';
import authConfig from '../../config/authConfig';
import UnauthorizedError from '../Error/UnauthorizedError';

class JwtServices {
  createToken(id): string {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  }

  verifyToken(token): number {
    try {
      const decoded = jwt.verify(token, authConfig.secret) as { id };
      return decoded.id;
    } catch (err) {
      throw new UnauthorizedError();
    }
  }
}

export default new JwtServices();
