import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model('users', userSchema);
