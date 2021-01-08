import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateCategoryService from '../services/categoryServices/CreateCategoryService';

const categoriesRouter = Router();
categoriesRouter.use(ensureAuthenticated);
categoriesRouter.post('/', async (request, response) => {
  const { name, description, user } = request.body;
  const createCategoryService = new CreateCategoryService();
  const category = await createCategoryService.execute({
    name,
    description,
    user,
  });
  return response.json(category);
});

export default categoriesRouter;
