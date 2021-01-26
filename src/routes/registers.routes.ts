import Router from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Product from '../models/Product';
import Register from '../models/Register';
import CreateRegisterService from '../services/RegisterServices/CreateRegisterService';
import DeleteRegisterService from '../services/RegisterServices/DeleteRegisterService';
import { userAuthenticated } from '../utils/userAuthenticated';

const registersRouter = Router();

export default registersRouter;

registersRouter.use(ensureAuthenticated);

registersRouter.post('/', async (request, response) => {
  const { products, type, reason } = request.body;
  const user = request.userId;
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
  const { type } = request.query;
  const registerRepository = getRepository(Register);
  let registers;
  if (!type) {
    registers = await registerRepository.find();
  } else {
    await registerRepository.find({
      where: { type },
    });
  }
  // const registers = await registerRepository
  //   .createQueryBuilder('registers')
  //   .select('registers')
  //   .leftJoinAndSelect('registers.products', 'product')
  //   .getMany();
  return response.json(registers);
});

registersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteRegisterService = new DeleteRegisterService();
  deleteRegisterService.execute(id);
});
