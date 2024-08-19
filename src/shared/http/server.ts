import 'reflect-metadata';
import express, { Application } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import '@shared/typeorm/index';
import { errors } from 'celebrate';

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());
app.use(errorHandlerMiddleware);

app.listen(3333, () => {
  console.log(`Server started at http://localhost:${3333}`);
});
