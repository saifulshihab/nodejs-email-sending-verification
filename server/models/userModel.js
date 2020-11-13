import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmed: false,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);

export default User;
