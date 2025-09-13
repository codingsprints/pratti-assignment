import * as dotenv from 'dotenv';
import path from 'path';
import { NODE_ENV_VAL } from '../utils/constants';

const nodeENV: string = NODE_ENV_VAL.DEVELOPMENT;
// const nodeENV: string = NODE_ENV_VAL.TEST;
// const nodeENV: string = NODE_ENV_VAL.PRODUCTION;

dotenv.config({
  path: path.resolve(
    __dirname,
    `../../../.env.${process.env.NODE_ENV ?? nodeENV}`,
  ),
});

interface Config {
  port: number;
  nodeEnv: string;
  baseUrl: string;
  hostname: string;
  database_url: string;
  refreshTokenSecret: string;
  jwtSecret: string;
  refreshTokenIssuer: string;
  accessTokenIssuer: string;
  accessTokenExpiration: string;
  refreshTokenExpiration: string;
}

export const configENV: Config = {
  port: parseInt(process.env.PORT ?? '3300', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  baseUrl: process.env.BASE_URL ?? '/v1/api',
  hostname: process.env.HOSTNAME ?? 'localhost',
  database_url: process.env.MONGO_URI ?? '',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET ?? '',
  jwtSecret: process.env.JWT_SECRET ?? '',
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION ?? '1m',
  refreshTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION ?? '1y',
  refreshTokenIssuer: process.env.REFRESH_TOKEN_ISSUER ?? 'contentplatform',
  accessTokenIssuer: process.env.ACCESS_TOKEN_ISSUER ?? 'contentplatform',
};
