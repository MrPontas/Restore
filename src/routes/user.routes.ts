import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, login, email, password, administrator } = request.body;

  const createUser = new CreateUserService();

  const user = createUser.execute({
    name,
    login,
    email,
    password,
    administrator,
  });

  return response.json(user);
});
export default usersRouter;
