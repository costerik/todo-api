import Router from 'koa-router';

const routes = new Router({ prefix: '/users' });

/* controller */
import { userCreate, userAll, userGet, userUpdate, addTask } from '../controllers/users.controller';

routes.get('/', userAll);
routes.get('/:id', userGet);
routes.post('/', userCreate);
routes.patch('/:id', userUpdate);
routes.patch('/:id/tasks', addTask);

export default routes;
