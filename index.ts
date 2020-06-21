import dotenv from 'dotenv';
dotenv.config();
import Koa from 'koa';
import Router from 'koa-router';
import Logger from 'koa-logger';
import Json from 'koa-json';
import BodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

const app = new Koa();
const router = new Router();

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

/* routes */
router.get('/', async (ctx, next) => {
  ctx.body = { msg: 'Hello world...' };
  await next();
});

/* middlewares */
app.use(router.routes()).use(router.allowedMethods());
app.use(BodyParser());
app.use(Json());
app.use(Logger());

app.listen(3000, () => console.log('Koa server started...'));
