import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../configs/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // VALIDAÇÃO DO TOKEN JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing!', 401);
  }

  // Bearer japsieojr323093298rujew
  const [, token] = authHeader.split(' ');
  try {
    verify(token, authConfig.jwt.secret, (err, decoded) => {
      if (err) {
        throw new AppError('Invalid JWT token!', 401);
      }
      const { sub } = decoded as TokenPayload;
      request.userId = sub;
    });

    return next();
  } catch (err) {
    // throw new AppError('Invalid JWT token', 401);
    throw new AppError(err);
  }
}
