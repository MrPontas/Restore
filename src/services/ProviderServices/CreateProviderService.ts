import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Provider from '../../models/Provider';

interface Request {
  name: string;
  active: boolean;
  user: string;
}

class CreateProviderService {
  public async execute({ name, active, user }: Request): Promise<Provider> {
    const providerRepo = getRepository(Provider);
    const checkIfProviderExists = await providerRepo.findOne({
      where: { name },
    });

    if (checkIfProviderExists) {
      throw new AppError('The provider is already registered.');
    }

    const provider = providerRepo.create({
      name: name,
      active: active,
      user: user,
    });
    await providerRepo.save(provider);

    return provider;
  }
}
export default CreateProviderService;
