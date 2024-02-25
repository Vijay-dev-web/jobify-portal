import mongoose from 'mongoose';
import { USER_ROLES } from '../utils/constants.js';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName'
  },
  location: {
    type: String,
    default: 'Bangalore'
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    default: 'user'
  },
  avatar: String,
  avatarPublicId: String,
});

UserSchema.methods.toJson = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

export default mongoose.model('User', UserSchema);
