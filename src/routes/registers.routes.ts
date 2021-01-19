import Router from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Register from '../models/Register';
import CreateRegisterService from '../services/RegisterServices/CreateRegisterService';
import { userAuthenticated } from '../utils/userAuthenticated';

const registersRouter = Router();

export default registersRouter;

registersRouter.use(ensureAuthenticated);

registersRouter.post('/', async (request, response) => {
  const { products, type, reason } = request.body;
  const user = request.userId;
  const registersRepository = getRepository('registers');
  const registerService = new CreateRegisterService();
  const register = await registerService.execute({
    products,
    type,
    reason,
    user,
  });
  return response.json(register);
});

registersRouter.get('/', async (request, response) => {
  const registerRepository = getRepository(Register);
  const registers = await registerRepository.find();
  return response.json(registers);
});

registersRouter.put('/', async (request, response) => {});

registersRouter.delete('/', async (request, response) => {});
