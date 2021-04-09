import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Category from '../../models/Category';
import Product from '../../models/Product';
import { userAuthenticated } from '../../utils/userAuthenticated';

interface Request {
  name: string;
  description?: string;
  products?: Product[];
  user: string; //user id
}

class CreateCategoryService {
  public async execute({
    name,
    description,
    products,
    user,
  }: Request): Promise<Category | undefined> {
    if (!name) {
      throw new AppError('Please inform the category name!');
    }
    const userObject = await userAuthenticated(user);
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
      user: userObject,
      products,
    });
    categoryRepository.save(category);
    return category;
  }
}
export default CreateCategoryService;
