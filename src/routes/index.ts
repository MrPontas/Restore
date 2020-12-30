import { Router } from 'express';
import usersRouter from './user.routes';

const routes = Router();

routes.use('/user', usersRouter);

export default routes;
