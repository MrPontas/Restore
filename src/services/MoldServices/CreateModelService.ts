import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Mold from '../../models/Mold';

class CreateMoldService {
  public async execute(name: string): Promise<Mold | undefined> {
    if (!name) {
      throw new AppError('Please inform the model!');
    }
    const moldRepository = getRepository(Mold);
    const checkIfMoldExists = await moldRepository.findOne({
      where: { name },
    });
    if (checkIfMoldExists) {
      throw new AppError('The model already exists!');
    }

    const mold = moldRepository.create({ name });
    await moldRepository.save(mold);
    return mold;
  }
}
export default CreateMoldService;
