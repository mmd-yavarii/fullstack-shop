import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  phone: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 14,
  },

  password: {
    type: String,
    required: true,
    minLength: 8,
  },

  name: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: 'user',
  },

  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User = models.User || model('User', UserSchema);
export default User;
