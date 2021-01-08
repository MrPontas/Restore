import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

interface Request {
  name: string;
  description: string;
  user: string;
}

class CreateCategoryService {
  public async execute({ name, description, user }: Request) {
    const categoryRepository = getRepository('categories');
    const checkIfCategoryExists = await categoryRepository.findOne({
      where: { name },
    });
    if (checkIfCategoryExists) {
      throw new AppError('The category already exists!');
    }
    const category = await categoryRepository.create({
      name,
      description,
      user,
    });

    return category;
  }
}
export default CreateCategoryService;
