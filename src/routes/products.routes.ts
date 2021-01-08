import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productsRouter = Router();
productsRouter.use(ensureAuthenticated);

productsRouter.get('/', async (request, response) => {
  return response.json({ ok: true });
});

export default productsRouter;
