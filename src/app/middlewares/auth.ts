import UnauthorizedError from '../Error/UnauthorizedError'
import JwtServices from '../Services/JwtServices';
import { Response } from 'express';
import FastFeetReq from '../utils/Interfaces';

export default async (req: FastFeetReq, res: Response, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError();
  }

  const [, token] = authHeader.split(' ');

  req.userId = JwtServices.verifyToken(token);

  return next();
};
