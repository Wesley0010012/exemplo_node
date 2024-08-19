import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { UsersController } from '../controllers/users.controller';
import { isAuthenticated } from '../middlewares/is-authenticated.middleware';

const controller = new UsersController();

const usersRouter = Router();

usersRouter.get('/', isAuthenticated, controller.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  controller.create
);

export default usersRouter;
