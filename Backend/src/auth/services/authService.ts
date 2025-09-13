import bcrypt from 'bcryptjs';
import User from '../models/authModel';
import createHttpError from 'http-errors';
import { IUser } from '../authType';

export const comparePassword = async (
  userPassword: string,
  passwordHash: string,
): Promise<boolean> => {
  return await bcrypt.compare(userPassword, passwordHash);
};

export const findByEmailWithPasswordService = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User can not found!!');
  }
  return user;
};

export const findByIdService = async (id: string): Promise<IUser | null> => {
  const user = await User.findById({ _id: id }).select('-password');
  if (!user) {
    throw Error('User can not found!!');
  }
  return user;
};
