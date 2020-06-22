import mongoose from 'mongoose';

import type { TaskType } from './task.model';

export type UserType = {
  name: string;
  lastname: string;
  tasks: Array<TaskType>;
} & mongoose.Document;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Please enter a user name',
    },
    lastname: {
      type: String,
      trim: true,
      required: 'Please enter a user lastname',
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<UserType>('User', userSchema);
