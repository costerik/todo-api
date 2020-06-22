import Router from 'koa-router';

const routes = new Router({ prefix: '/tasks' });

/* controller */
import { taskAll, taskCreate, taskGet, taskUpdate } from '../controllers/tasks.controller';

routes.get('/', taskAll);
routes.get('/:id', taskGet);
routes.post('/', taskCreate);
routes.patch('/:id', taskUpdate);

export default routes;
