import Router from 'koa-router';

const routes = new Router({ prefix: '/states' });

/* controller */
import { getStates, createState } from '../controllers/states.controller';

routes.get('/', getStates);
routes.post('/', createState);

export default routes;
