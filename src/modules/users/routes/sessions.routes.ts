import { Router } from 'express';
import { SessionsController } from '../controllers/sessions.controller';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionsRouter = Router();
const controller = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  controller.create
);

export default sessionsRouter;
