import Router from 'koa-router';
import mongoose from 'mongoose';
const State = mongoose.model('State');

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function getStates(ctx: Router.RouterContext, next: () => any): Promise<void> {
  try {
    const states = await State.find();
    ctx.response.status = 200;
    ctx.response.body = states;
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { error: e.message };
  } finally {
    await next();
  }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function createState(ctx: Router.RouterContext, next: () => any): Promise<void> {
  try {
    const { name } = ctx.request.body;
    const state = new State({ name });
    const createdState = await state.save();
    ctx.response.status = 201;
    ctx.response.body = createdState;
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { error: e.message };
  } finally {
    await next();
  }
}
