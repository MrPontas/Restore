import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAdministrator from '../middlewares/ensureAdministrator';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import User from '../models/User';

import CreateUserService from '../services/userServices/CreateUserService';
import DeleteUserService from '../services/userServices/DeleteUserService';
import UpdateUserService from '../services/userServices/UpdateUserService';
const usersRouter = Router();

usersRouter.use(ensureAuthenticated);
usersRouter.use(ensureAdministrator);

usersRouter.post('/', async (request, response) => {
  const { name, login, email, password, administrator } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    login,
    email,
    password,
    administrator,
  });

  return response.json(user);
});

usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  console.log(id);
  const userRepository = getRepository(User);
  const query = userRepository
    .createQueryBuilder('user')
    .select('user')
    .addSelect('user.password')
    .addSelect('user.login')
    .addSelect('user.email');

  if (id) query.where(`user.id = '${id}'`);
  const user = await query.orderBy(`user.name`).getMany();
  return response.json(user);
});

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const user = await userRepository
    .createQueryBuilder('users')
    .select(`users`)
    .addSelect('users.password')
    .addSelect('users.login')
    .addSelect('users.email')
    .orderBy(`users.name`)
    .getMany();
  return response.json(user);
});

usersRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  console.log(id);
  const { name, login, password, email, administrator } = request.body;
  const updateUser = new UpdateUserService();
  const user = await updateUser.execute({
    id,
    name,
    login,
    email,
    password,
    administrator,
  });
  return response.json(user);
});

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteUser = new DeleteUserService();
  const deleteResult = await deleteUser.execute(id, request);
  return response.json(deleteResult);
});
export default usersRouter;
