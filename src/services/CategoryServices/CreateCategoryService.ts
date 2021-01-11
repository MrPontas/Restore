import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Category from '../../models/Category';

interface Request {
  name: string;
  description: string;
  user: string;
}

class CreateCategoryService {
  public async execute({
    name,
    description,
    user,
  }: Request): Promise<Category | undefined> {
    if (!name) {
      throw new AppError('Please inform the category name!');
    }

    const categoryRepository = getRepository(Category);
    const checkIfCategoryExists = await categoryRepository.findOne({
      where: { name },
    });
    if (checkIfCategoryExists) {
      throw new AppError('The category already exists!');
    }
    const category = categoryRepository.create({
      name,
      description,
      user,
    });
    categoryRepository.save(category);
    return category;
  }
}
export default CreateCategoryService;
