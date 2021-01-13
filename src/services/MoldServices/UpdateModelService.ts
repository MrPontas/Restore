import Mold from '../../models/Mold';
import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  name?: string;
}
class UpdateMoldService {
  public async execute({ id, name }: Request): Promise<Mold | undefined> {
    const moldRepository = getRepository(Mold);
    const mold = await moldRepository.findOne(id);

    if (!mold) {
      throw new AppError('Model not found.', 404);
    }

    if (!name) name = mold.name;

    try {
      await moldRepository.update(id, { name });
      const moldUpdated = await moldRepository.findOne(id);

      return moldUpdated;
    } catch (errSql) {
      throw new AppError(errSql.message);
    }
  }
}

export default UpdateMoldService;
