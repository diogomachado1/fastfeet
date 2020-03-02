import jwt from "jsonwebtoken";
import authConfig from "../../config/authConfig";
import UnauthorizedError from "../Error/UnauthorizedError";

class JwtServices {
  createToken(id){
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  }
  verifyToken(token){
    try {
      const decoded = jwt.verify(token, authConfig.secret);
      return decoded['id'];
    } catch (err) {
      throw new UnauthorizedError();
    }

  }
}

export default new JwtServices();
