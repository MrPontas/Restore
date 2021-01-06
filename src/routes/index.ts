import { Router } from 'express';
import sessionsRouter from './sessions.routes';
import usersRouter from './user.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
