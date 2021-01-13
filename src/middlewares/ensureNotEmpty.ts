import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

export default function checkEmpty(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (request.method == 'POST' || request.method == 'PATCH') {
    if (Object.keys(request.body).length === 0) {
      console.log(request.body);
      throw new AppError('You need to send some information.');
    }
  }

  // if (request.method == 'DELETE') {
  //   console.log(request.params);
  //   if (Object.keys(request.params).length === 0) {
  //     throw new AppError("Can't comunicate without identifier.");
  //   }
  // }
  return next();
}
