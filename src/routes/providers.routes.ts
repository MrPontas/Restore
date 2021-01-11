import { Router } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Provider from '../models/Provider';
import CreateProviderService from '../services/ProviderServices/CreateProviderService';
import DeleteProviderService from '../services/ProviderServices/DeleteProviderService';
import UpdateProviderService from '../services/ProviderServices/UpdateProviderService';

const providersRoutes = Router();
providersRoutes.use(ensureAuthenticated);

providersRoutes.post('/', async (request, response) => {
  const { name, active } = request.body;
  const userAuthId = request.user.id;

  const createProviderService = new CreateProviderService();
  const provider = await createProviderService.execute({
    name,
    active,
    user: userAuthId,
  });
  return response.json(provider);
});

providersRoutes.get('/', async (request, response) => {
  const providerRepository = getRepository(Provider);
  const providers = await providerRepository.find();
  if (!providers) {
    throw new AppError('There is no providers registered.', 404);
  }
  return response.json(providers);
});

providersRoutes.patch('/:id', async (request, response) => {
  const { name, active } = request.body;
  const { id } = request.params;
  const user = request.user.id;
  const providerService = new UpdateProviderService();
  const providerUpdated = await providerService.execute({
    id,
    name,
    user,
    active,
  });

  return response.json(providerUpdated);
});

providersRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteProviderService = new DeleteProviderService();
  const deletedProvider = await deleteProviderService.execute(id);

  return response.json(deletedProvider);
});

export default providersRoutes;
