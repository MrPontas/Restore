import AppError from '../../errors/AppError';
import { DeleteResult, getRepository } from 'typeorm';
import Category from '../../models/Category';

class DeleteCategoryService {
  public async execute(id: string): Promise<DeleteResult> {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.findOne(id);
    if (!category) {
      throw new AppError('Category not found.', 404);
    }
    const categoryDeleted = await categoryRepository.delete(id);
    return categoryDeleted;
  }
}

export default DeleteCategoryService;
