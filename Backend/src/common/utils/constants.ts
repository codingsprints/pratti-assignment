import { Response } from 'express';
import { configENV } from '../config/config';

export const NODE_ENV_VAL = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
};

export const JWT_ALGORITHM = 'HS256';

export const msInYear = () => {
  const now = new Date();
  const year = now.getFullYear();
  const days =
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
  return days * 24 * 60 * 60 * 1000;
};

export const setResponseCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
): void => {
  //Add token to cookie
  res.cookie('accessToken', accessToken, {
    domain: 'localhost',
    httpOnly: true, //very important
    secure: configENV.nodeEnv === 'production',
    sameSite: 'strict',
    // signed: true,
    maxAge: 1000 * 60 * 60, // cookie expires in 1 hours
  });
  res.cookie('refreshToken', refreshToken, {
    domain: 'localhost',
    httpOnly: true, //very important
    secure: configENV.nodeEnv === 'production',
    sameSite: 'strict',
    // signed: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // cookie expires in 1 year
  });
};
