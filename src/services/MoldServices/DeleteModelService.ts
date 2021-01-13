import AppError from '../../errors/AppError';
import { DeleteResult, getRepository } from 'typeorm';
import Mold from '../../models/Mold';

class DeleteMoldService {
  public async execute(id: string): Promise<DeleteResult> {
    const moldRepository = getRepository(Mold);
    const mold = await moldRepository.findOne(id);
    if (!mold) {
      throw new AppError('Model not found.', 404);
    }
    const moldDeleted = await moldRepository.delete(id);
    return moldDeleted;
  }
}

export default DeleteMoldService;
