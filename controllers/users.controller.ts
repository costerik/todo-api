import Koa from 'koa';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function get(ctx: Koa.Context, next: () => any): Promise<void> {
  ctx.body = { msg: 'Hello Users...' };
  await next();
}
