import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a user name',
  },
  tasks: [String],
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('User', userSchema);
