import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

export default function checkEmpty(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (
    request.method == 'POST' ||
    request.method == 'PATCH' ||
    request.method == 'PUT'
  ) {
    if (Object.keys(request.body).length === 0) {
      throw new AppError('You need to send some information.');
    }
  }

  return next();
}
