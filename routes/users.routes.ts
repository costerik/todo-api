import Router from 'koa-router';

const routes = new Router({ prefix: '/users' });

/* controller */
import { get } from '../controllers/users.controller';

routes.get('/', get);

export default routes;
