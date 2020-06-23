import Router from 'koa-router';

const routes = new Router({ prefix: '/tasks' });

/* controller */
import { taskAll, taskCreate, taskGet, taskUpdate, removeUser } from '../controllers/tasks.controller';

routes.get('/', taskAll);
routes.get('/:id', taskGet);
routes.post('/', taskCreate);
routes.patch('/:id', taskUpdate);
routes.patch('/:id/user', removeUser);

export default routes;
