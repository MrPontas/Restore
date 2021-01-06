import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../configs/auth';
import AppError from '../errors/AppError';
import User from '../models/User';

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
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    // pra minha aplicação talvez não venha a ser necessário essa parte.
    // Ela serve pra deixar o id do usuario autenticado disponivel no request
    // pra ser acessado em demais locais.
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
