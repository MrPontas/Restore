import { Router } from 'express';
import { verify } from 'jsonwebtoken';

import AuthenticateUserService from '../services/userServices/AuthenticateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import authConfig from '../configs/auth';
import AppError from '../errors/AppError';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { login, password } = request.body;
  const session = new AuthenticateUserService();
  const { token, user } = await session.execute({ login, password });

  return response.json({ user, token });
});
sessionsRouter.get('/', async (request, response) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Unauthorized', 401);
  }
  const [, token] = authHeader.split(' ');

  verify(token, authConfig.jwt.secret, (err, decoded) => {
    if (err) {
      throw new AppError('Unauthorized', 401);
    }
  });
  return response.json({ token: 'valid' });
});

export default sessionsRouter;
