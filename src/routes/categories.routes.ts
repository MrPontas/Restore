import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import Category from '../models/Category';
import User from '../models/User';

import CreateCategoryService from '../services/CategoryServices/CreateCategoryService';
import DeleteCategoryService from '../services/CategoryServices/DeleteCategoryService';
import UpdateCategoryService from '../services/CategoryServices/UpdateCategoryService';

const categoriesRouter = Router();
categoriesRouter.use(ensureAuthenticated);
categoriesRouter.post('/', async (request, response) => {
  const { name, description } = request.body;

  if (!name && !description) throw new AppError('Please verify your request');
  const user = request.userId;
  const createCategoryService = new CreateCategoryService();
  const category = await createCategoryService.execute({
    name,
    description,
    user,
  });
  return response.json(category);
});
categoriesRouter.get('/', async (request, response) => {
  const categoryRepository = getRepository(Category);
  const categories = await categoryRepository.find();
  return response.json(categories);
});

categoriesRouter.patch('/:id', async (request, response) => {
  const { name, description } = request.body;
  const { id } = request.params;

  if (!name && !description) throw new AppError('Please verify your request');

  const user = request.userId;
  const categoryService = new UpdateCategoryService();
  const categoryUpdated = await categoryService.execute({
    id,
    name,
    description,
    user,
  });

  return response.json(categoryUpdated);
});

categoriesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteCategoryService = new DeleteCategoryService();
  const deletedCategory = await deleteCategoryService.execute(id);

  return response.json(deletedCategory);
});

export default categoriesRouter;
