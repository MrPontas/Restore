import { Router } from 'express';
import ensureNotEmpty from '../middlewares/ensureNotEmpty';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import productsRouter from './products.routes';
import categoriesRouter from './categories.routes';
import providersRouter from './providers.routes';
import moldsRouter from './molds.routes';
import registersRouter from './registers.routes';
import recRouter from './recover.routes';

const routes = Router();

routes.use(ensureNotEmpty);
routes.use('/users', usersRouter);
routes.use('/recover', recRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/providers', providersRouter);
routes.use('/models', moldsRouter);
routes.use('/registers', registersRouter);

export default routes;
