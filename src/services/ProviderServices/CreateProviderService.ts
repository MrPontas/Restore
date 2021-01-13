import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Provider from '../../models/Provider';
import { userAuthenticated } from '../../utils/userAuthenticated';

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

    const userAuth = await userAuthenticated(user);
    if (checkIfProviderExists) {
      throw new AppError('The provider is already registered.');
    }

    const provider = providerRepo.create({
      name: name,
      active: active,
      user: userAuth,
    });
    await providerRepo.save(provider);

    return provider;
  }
}
export default CreateProviderService;
