import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
const usersRouter = Router();

interface User {
  password?: string;
}
usersRouter.post('/', async (request, response) => {
  const { name, login, email, password, administrator } = request.body;

  const createUser = new CreateUserService();

  const user: User = await createUser.execute({
    name,
    login,
    email,
    password,
    administrator,
  });
  delete user.password;
  return response.json(user);
});
export default usersRouter;
