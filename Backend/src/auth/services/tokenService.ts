import { JwtPayload, sign } from 'jsonwebtoken';
import { IUser } from '../authType';
import CreateHttpError from 'http-errors';
import { configENV } from '../../common/config/config';
import { JWT_ALGORITHM, msInYear } from '../../common/utils/constants';
import { RefreshToken } from '../models/RefreshTokenModel';
import logger from '../../common/config/logger';

export const generateAccessToken = (payload: JwtPayload): string => {
  if (!configENV.jwtSecret) {
    throw CreateHttpError(
      500,
      'Access token secret not found in configuration',
    );
  }

  // Generate Access Token with HS256
  return sign(payload, configENV.jwtSecret, {
    algorithm: JWT_ALGORITHM, // symmetric secret algorithm
    expiresIn: '1m',
    issuer: configENV.accessTokenIssuer,
  });
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  if (!configENV.refreshTokenSecret) {
    throw CreateHttpError(
      500,
      'Refresh token secret not found in configuration',
    );
  }

  // Generate Refresh Token with HS256
  return sign(payload, configENV.refreshTokenSecret, {
    algorithm: JWT_ALGORITHM,
    expiresIn: '1y',
    issuer: configENV.refreshTokenIssuer,
    jwtid: payload.id?.toString() ?? undefined, //embed the refresh token id
  });
};

export const persistRefreshToken = async (user: IUser) => {
  const expiresAt = new Date(Date.now() + msInYear());
  const newRefreshToken = await RefreshToken.create({
    user: user._id,
    expiresAt,
  });
  const newVal = await newRefreshToken.populate({
    path: 'user',
    select: '-password', // ✅ exclude password
  });
  return newVal;
};

export const deleteRefreshToken = async (tokenId: string) => {
  try {
    const deletedToken = await RefreshToken.findByIdAndDelete(tokenId);

    if (!deletedToken) {
      throw new Error('Refresh token not found');
    }

    return deletedToken;
  } catch (error: unknown) {
    // Type guard to safely access error properties
    if (error instanceof Error) {
      logger.error('Error deleting refresh token:', error.message);
    } else {
      throw new Error('Unknown error occurred while deleting refresh token');
    }
  }
};
