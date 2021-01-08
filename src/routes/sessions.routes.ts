import { Router } from 'express';
import authenticatedUserService from '../services/userServices/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { login, password } = request.body;
  const session = new authenticatedUserService();
  const { token, user } = await session.execute({ login, password });

  return response.json({ user, token });
});

export default sessionsRouter;
