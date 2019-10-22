import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateMeetupStore from './app/validators/MeetupStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) =>
  res.json({
    message: 'Welcome to meetapp API',
    documentation:
      'https://app.swaggerhub.com/apis-docs/giovanniantonaccio/Meetapp/1.0.0',
  })
);

routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', validateMeetupStore, MeetupController.store);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
