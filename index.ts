import dotenv from 'dotenv';
dotenv.config();
import Koa from 'koa';
import Logger from 'koa-logger';
import Json from 'koa-json';
import BodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import cors from '@koa/cors';

const app = new Koa();

mongoose.connect(process.env.DATABASE_URL || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected...');
});

mongoose.connection.on('error', (err) => {
  console.error('error', err);
});

/* models */
import './models/user.model';
import './models/task.model';
import './models/state.model';

/* routes */
import usersRoutes from './routes/users.routes';
import tasksRoutes from './routes/tasks.routes';
import statesRoutes from './routes/states.routes';

/* middlewares */
app.use(cors());
app.use(BodyParser());
app.use(Json());
app.use(Logger());
app.use(usersRoutes.routes()).use(usersRoutes.allowedMethods());
app.use(tasksRoutes.routes()).use(tasksRoutes.allowedMethods());
app.use(statesRoutes.routes()).use(statesRoutes.allowedMethods());

app.listen(process.env.PORT || 3000, () =>
  console.log(`Koa server started on port ${process.env.PORT || 3000}...`)
);
