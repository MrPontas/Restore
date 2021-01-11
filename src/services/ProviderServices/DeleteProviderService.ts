import { DeleteResult, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Provider from '../../models/Provider';

class DeleteProviderService {
  public async execute(id: string): Promise<DeleteResult> {
    const providerRepo = getRepository(Provider);
    const provider = await providerRepo.findOne(id);
    if (!provider) {
      throw new AppError('Provider not found.', 404);
    }

    const providerDeleted = await providerRepo.delete(id);
    return providerDeleted;
  }
}
export default DeleteProviderService;
