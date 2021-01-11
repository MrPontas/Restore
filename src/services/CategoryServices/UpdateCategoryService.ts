import Category from '../../models/Category';
import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  name?: string;
  description?: string;
  user: string;
}
class UpdateCategoryService {
  public async execute({
    id,
    name,
    description,
    user,
  }: Request): Promise<Category | undefined> {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.findOne(id);

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    if (!name) name = category.name;
    if (!description) description = category.description;

    try {
      await categoryRepository.update(id, { name, description, user });
      const categoryUpdated = await categoryRepository.findOne(id);

      return categoryUpdated;
    } catch (errSql) {
      throw new AppError(errSql.message);
    }
  }
}

export default UpdateCategoryService;
