import Router from 'express';
import { getRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateMoldService from '../services/MoldServices/CreateModelService';
import UpdateMoldService from '../services/MoldServices/UpdateModelService';
import DeleteMoldService from '../services/MoldServices/DeleteModelService';

import Mold from '../models/Mold';
import AppError from '../errors/AppError';

const moldsRouter = Router();

moldsRouter.use(ensureAuthenticated);

moldsRouter.post('/', async (request, response) => {
  const { name } = request.body;

  if (!name) throw new AppError('Please verify your request');

  const createModelService = new CreateMoldService();
  const mold = await createModelService.execute(name);
  return response.json(mold);
});

moldsRouter.get('/', async (request, response) => {
  const moldRepository = getRepository(Mold);
  const molds = await moldRepository.find();
  return response.json(molds);
});

moldsRouter.patch('/:id', async (request, response) => {
  const { name } = request.body;
  const { id } = request.params;

  if (!name) throw new AppError('Please verify your request');

  const moldService = new UpdateMoldService();
  const moldUpdated = await moldService.execute({
    id,
    name,
  });

  return response.json(moldUpdated);
});

moldsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteMoldService = new DeleteMoldService();
  const deletedMold = await deleteMoldService.execute(id);

  return response.json(deletedMold);
});

export default moldsRouter;
