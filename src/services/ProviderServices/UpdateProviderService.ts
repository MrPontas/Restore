import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Provider from '../../models/Provider';

interface Request {
  id: string;
  name: string;
  user: string;
  active: boolean;
}

class UpdateProviderService {
  public async execute({
    id,
    name,
    active,
    user,
  }: Request): Promise<Provider | undefined> {
    const providerRepo = getRepository(Provider);
    const provider = await providerRepo.findOne(id);
    if (!provider) {
      throw new AppError('Provider not found.', 404);
    }
    if (!name) name = provider.name;
    if (active === undefined) active = provider.active;

    try {
      await providerRepo.update(id, {
        name,
        active,
        user,
      });

      const providerUpdated = await providerRepo.findOne(id);
      return providerUpdated;
    } catch (sqlErr) {
      throw new AppError(sqlErr.message);
    }
  }
}
export default UpdateProviderService;
