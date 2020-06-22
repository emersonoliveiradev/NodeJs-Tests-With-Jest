import { Router } from 'express';

import UserController from './app/controllers/UserContoller';

const routes = new Router();

routes.post('/users', UserController.store);

export default routes;
