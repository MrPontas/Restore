import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productsRouter = Router();
productsRouter.use(ensureAuthenticated);

productsRouter.post('/', async (request, response) => {});
productsRouter.get('/', async (request, response) => {
  return response.json({ ok: true });
});
productsRouter.put('/', async (request, response) => {});
productsRouter.delete('/', async (request, response) => {});

export default productsRouter;
