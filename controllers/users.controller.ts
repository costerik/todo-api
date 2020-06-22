import Router from 'koa-router';
import mongoose from 'mongoose';
import { UserType } from '../models/user.model';
const User = mongoose.model<UserType>('User');

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function userAll(ctx: Router.RouterContext, next: () => any): Promise<void> {
  try {
    const users = await User.find().populate('tasks');
    ctx.response.status = 200;
    ctx.response.body = users;
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { error: e.message };
  } finally {
    await next();
  }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function userCreate(ctx: Router.RouterContext, next: () => any): Promise<void> {
  try {
    const { name, lastname } = ctx.request.body;
    const user = new User({ name, lastname });
    const createdUser = await user.save();
    ctx.response.status = 201;
    ctx.response.body = createdUser;
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { error: e.message };
  } finally {
    await next();
  }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function userGet(ctx: Router.RouterContext, next: () => any): Promise<void> {
  try {
    const user = await User.findOne({ _id: ctx.params.id }).populate('tasks');
    ctx.response.status = 200;
    ctx.response.body = { user };
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { error: e.message };
  } finally {
    await next();
  }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function userUpdate(ctx: Router.RouterContext, next: () => any): Promise<void> {
  try {
    const user = await User.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body, {
      new: true,
      runValidators: true,
    });
    ctx.response.status = 200;
    ctx.response.body = { user };
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { error: e.message };
  } finally {
    await next();
  }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function addTask(ctx: Router.RouterContext, next: () => any): Promise<void> {
  try {
    const { taskId } = ctx.request.body;
    if (taskId) {
      const user = await User.findOne({ _id: ctx.params.id });
      user?.tasks.push(taskId);
      await user?.save();
      ctx.response.status = 200;
      ctx.response.body = { user };
    } else {
      ctx.response.status = 400;
      ctx.response.body = { error: 'there is no valid taskId' };
    }
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { error: e.message };
  } finally {
    await next();
  }
}
