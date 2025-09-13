import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../authType';

// Create the schema
const UserSchema: Schema<IUser> = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  {
    timestamps: true,
  },
);

// Check if the model already exists to avoid recompilation errors in Next.js hot reload
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
