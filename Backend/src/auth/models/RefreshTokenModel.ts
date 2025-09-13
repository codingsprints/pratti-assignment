import mongoose, { Document, Model, Schema } from 'mongoose';
import { IRefreshTokenBase } from '../authType';

export type RefreshTokenDocument = Document & IRefreshTokenBase;

const RefreshTokenSchema = new Schema<RefreshTokenDocument>(
  {
    expiresAt: {
      type: Date,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // relation to User model
      required: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
    collection: 'refreshTokens', // same as your TypeORM entity name
  },
);

export const RefreshToken: Model<RefreshTokenDocument> =
  mongoose.models.RefreshToken ||
  mongoose.model<RefreshTokenDocument>('RefreshToken', RefreshTokenSchema);
