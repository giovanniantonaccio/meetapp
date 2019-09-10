import { Router } from 'express';

import UserController from './app/controllers/UserController';

import validateUserStore from './app/validators/UserStore';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

routes.post('/users', validateUserStore, UserController.store);

export default routes;
