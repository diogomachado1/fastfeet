import { Response, NextFunction } from 'express';
import UnauthorizedError from '../Error/UnauthorizedError';
import JwtServices from '../Services/JwtServices';
import FastFeetReq from '../utils/Interfaces';

export default (req: FastFeetReq, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError();
  }

  const [, token] = authHeader.split(' ');

  req.userId = JwtServices.verifyToken(token);

  return next();
};
