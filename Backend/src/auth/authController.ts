import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { JwtPayload } from 'jsonwebtoken';
import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';
import logger from '../common/config/logger';
import {
  deleteRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  persistRefreshToken,
} from './services/tokenService';
import { AuthRequest, IUser } from './authType';
import User from './models/authModel';
import {
  comparePassword,
  findByEmailWithPasswordService,
  findByIdService,
} from './services/authService';
import { setResponseCookies } from '../common/utils/constants';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0]?.msg));
    }

    const { userName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      //   return ({ message: 'Email already registered' });
      return next(createHttpError(400, 'Email already registered'));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user: IUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({ message: 'create user successfully', data: user });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(createHttpError(400, result.array()[0]?.msg));
  }
  try {
    const { email, password } = req.body;
    logger.debug('New request to login a user', {
      email,
      password: '******',
    });

    const existUser = await findByEmailWithPasswordService(email);

    // compare password
    const isPasswordMatch = await comparePassword(
      password,
      existUser?.password,
    );

    if (!isPasswordMatch) {
      next(createHttpError(400, 'Email or Password does not match!'));
      return;
    }

    const payload: JwtPayload = {
      sub: String(existUser?._id),
      email: existUser?.email,
    };
    const accessToken = generateAccessToken(payload);

    //persist refresh token
    const newRefreshToken = await persistRefreshToken(existUser);

    const modifyToken = {
      ...payload,
      id: String(newRefreshToken.id),
    };

    const refreshToken = generateRefreshToken(modifyToken);

    setResponseCookies(res, accessToken, refreshToken);

    logger.info('user has been logged in', { id: newRefreshToken?.id });

    res.status(200).json({
      message: 'user Login successfully !!!',
      data: { userDto: newRefreshToken },
    });
  } catch (error) {
    next(error);
  }
};

export const self = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  //req.auth.id
  const id = req.auth.sub;
  const user = await User.findOne({ _id: id }).select('-password');
  if (!user) {
    next(createHttpError(404, 'user does not exist!'));
    return;
  }

  res
    .status(200)
    .json({ message: 'user fetch successfully!!!', data: { loginDto: user } });
};

export const refresh = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const payload: JwtPayload = { sub: req.auth.sub };
    const accessToken = generateAccessToken(payload);
    const existUser = await findByIdService(req.auth.sub);
    if (!existUser) {
      next(createHttpError(404, 'user does not exist!'));
      return;
    }

    const newRefreshToken = await persistRefreshToken(existUser);

    //delete old persist refresh token
    if (req.auth.id) await deleteRefreshToken(req.auth.id);

    logger.info('delete old refresh token', { id: req.auth.id });
    const modifyToken = {
      ...payload,
      id: String(newRefreshToken.id),
    };

    const refreshToken = generateRefreshToken(modifyToken);

    setResponseCookies(res, accessToken, refreshToken);

    res.status(200).json({
      message: 'refresh token and access token generated successfully',
      data: {
        refreshTokenDto: {
          existUser,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (req.auth.id) await deleteRefreshToken(req.auth.id);

    logger.info('Refresh Token has been deleted', { id: req.auth.id });
    logger.info('User has been logout', { id: req.auth.sub });
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({
      message: 'user logout successfully!!!',
      data: { logoutDto: { id: req.auth.id, email: req.auth.email } },
    });
  } catch (error) {
    next(error);
  }
};
