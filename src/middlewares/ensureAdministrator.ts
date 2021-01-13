import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';

export default async function ensureAdministrator(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const user = request.userId;
  const userRepository = getRepository(User);
  const userAuthenticated = await userRepository.findOne({
    where: { id: user },
  });

  if (!userAuthenticated) {
    throw new AppError('Something went wrong', 500); // somente pra tirar erro do user authenticated
  }

  if (!userAuthenticated.administrator) {
    throw new AppError('You need to be administrator to continue.', 403);
  }

  return next();
}
