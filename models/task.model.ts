import mongoose from 'mongoose';

import type { UserType } from './user.model';
import type { StateType } from './state.model';

export type TaskType = {
  title: string;
  description: string;
  state: StateType;
  user: UserType;
} & mongoose.Document;

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: 'Please enter a task title' },
    description: String,
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model<TaskType>('Task', taskSchema);
