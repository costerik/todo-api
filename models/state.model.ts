import mongoose from 'mongoose';

export type StateType = {
  name: string;
} & mongoose.Document;

const stateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Please enter a state name',
    },
  },
  { timestamps: true }
);

export default mongoose.model<StateType>('State', stateSchema);
