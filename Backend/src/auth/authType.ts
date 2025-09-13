import { Document, Types } from 'mongoose';

// Base user fields (used when creating a new user)
export interface IUserBase {
  userName: string;
  email: string;
  password: string;
}

// Full User Document (has _id, timestamps)
export interface IUser extends IUserBase, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// When creating a new user (without timestamps/_id)
export type IUserCreate = Omit<IUserBase, 'createdAt' | 'updatedAt'>;

// Refresh Token Document
export interface IRefreshTokenBase {
  user: Types.ObjectId; // just the fields
  expiresAt: Date;
}

export type IRefreshToken = IRefreshTokenBase & {
  createdAt: Date;
  updatedAt: Date;
};

export type AuthCookies = {
  accessToken: string;
  refreshToken: string;
};

export interface AuthRequest extends Request {
  auth: {
    sub: string;
    id?: string;
    email: string;
  };
}

export interface IRefreshTokenPayload {
  id: string;
}
