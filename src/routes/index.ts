import { Router } from 'express';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import productsRouter from './products.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRouter);

export default routes;
