import Router from 'express';
import {
  getRepository,
  Repository,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Product from '../models/Product';
import Register from '../models/Register';
import CreateRegisterService from '../services/RegisterServices/CreateRegisterService';
import DeleteRegisterService from '../services/RegisterServices/DeleteRegisterService';
import { userAuthenticated } from '../utils/userAuthenticated';
import { ParsedQs } from 'qs';

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
  let { start, end } = request.query;
  const registerRepository = getRepository(Register);
  let registers, query;
  query = registerRepository.createQueryBuilder('register');
  query.leftJoinAndSelect('register.products', 'product');
  query.leftJoinAndSelect('register.user', 'user');

  if (type === 'O' || type === 'I') {
    query.where(`register.type = :type`, { type: type });
  }

  if (!start) start = '1900-01-01 00:00:00';
  if (!end) end = '2500-12-12 23:59:59';

  const startTimestamp = start + ' 00:00:00';
  const endTimestamp = end + ' 23:59:59';

  query.where(
    `register.created_at BETWEEN '${startTimestamp}' AND '${endTimestamp}'`,
  );

  // if (start) {
  //   const startTimestamp = start + ' 00:00:00';

  //   query.where(`register.created_at >= :startDate`, {
  //     startDate: start,
  //   });
  // }
  // if (end) {
  //   const endTimestamp = end + ' 23:59:59';

  //   query.where(`register.created_at <= :endDate`, {
  //     endDate: end,
  //   });
  // }

  query.orderBy('register.created_at', 'DESC');
  registers = await query.getMany();
  return response.json(registers);
});

registersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const registerRepository = getRepository(Register);

  const product = await registerRepository.findOneOrFail({
    where: { id },
  });
  return response.json(product);
});

registersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const user = request.userId;
  const deleteRegisterService = new DeleteRegisterService();
  const deletedResult = await deleteRegisterService.execute(id, user);
  return response.json(deletedResult);
});
