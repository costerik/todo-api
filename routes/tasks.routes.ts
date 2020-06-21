import Router from 'koa-router';

const routes = new Router({ prefix: '/tasks' });

/* controller */
import { get } from '../controllers/tasks.controller';

routes.get('/', get);

export default routes;
