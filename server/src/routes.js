import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import validateUserStore from './app/validators/UserStore';
import validateSessionStore from './app/validators/SessionStore';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

routes.post('/users', validateUserStore, UserController.store);

routes.post('/sessions', validateSessionStore, SessionController.store);
export default routes;
