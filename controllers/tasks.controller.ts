import Router from 'koa-router';
import mongoose from 'mongoose';
import { TaskType } from '../models/task.model';
import { StateType } from '../models/state.model';
import { UserType } from '../models/user.model';
const Task = mongoose.model<TaskType>('Task');
const State = mongoose.model<StateType>('State');
const User = mongoose.model<UserType>('User');

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function taskAll(ctx: Router.RouterContext, next: () => any): Promise<void> {
  try {
    const tasks = await Task.find().populate('user').populate('state');
    ctx.response.status = 200;
    ctx.response.body = tasks;
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { error: e.message };
  } finally {
    await next();
  }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function taskCreate(ctx: Router.RouterContext, next: () => any): Promise<void> {
  try {
    const { title, description, state, user } = ctx.request.body;
    let stateId;
    let userId;
    if (state) {
      stateId = await State.findOne({ name: state }).select('_id');
    }

    if (user) {
      userId = await State.findOne({ _id: user }).select('_id');
    }

    if (!stateId) {
      stateId = await State.findOne({ name: 'OPEN' }).select('_id');
    }

    const task = await new Task({
      title,
      description,
      state: stateId && stateId._id,
      user: userId && userId._id,
    })
      .populate('state')
      .execPopulate();
    const createdTask = await task.save();
    ctx.response.status = 201;
    ctx.response.body = { createdTask };
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { error: e.message };
  } finally {
    await next();
  }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function taskGet(ctx: Router.RouterContext, next: () => any): Promise<void> {
  try {
    const task = await Task.findOne({ _id: ctx.params.id }).populate('user').populate('state');
    ctx.response.status = 200;
    ctx.response.body = { task };
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { error: e.message };
  } finally {
    await next();
  }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function taskUpdate(ctx: Router.RouterContext, next: () => any): Promise<void> {
  try {
    const task = await Task.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body, {
      new: true,
      runValidators: true,
    });
    ctx.response.status = 200;
    ctx.response.body = { task };
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { error: e.message };
  } finally {
    await next();
  }
}
