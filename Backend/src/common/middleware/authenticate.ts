import { expressjwt } from 'express-jwt';
import { Request } from 'express';
import logger from '../config/logger';
import { configENV } from '../config/config';
import { AuthCookies } from '../../auth/authType';
import { JWT_ALGORITHM } from '../utils/constants';

// This middleware verifies HS256 tokens with your jwtSecret
export default expressjwt({
  secret: configENV.jwtSecret, // 👈 just use the secret
  algorithms: [JWT_ALGORITHM], // 👈 must match algorithm you used to sign
  issuer: configENV.accessTokenIssuer, // optional, but good practice
  getToken(req: Request) {
    //check req.cookies
    try {
      const { accessToken } = req.cookies as AuthCookies;
      if (accessToken) {
        return accessToken;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error('No access token:', error.message);
        throw new Error(error.message);
      }
    }

    // 2. Check Authorization header via bearer token
    // const authHeader = req.headers.authorization;
    // console.log(req.headers);
    // // Bearer eyjllsdjfljlasdjfljlsadjfljlsdf(tocken)
    // if (authHeader && authHeader.split(' ')[1] !== 'undefined') {
    //   const token = authHeader.split(' ')[1];
    //   if (token) {
    //     return token;
    //   }
    // }

    // 3. using cookies parser secret
    // const { accessToken } = req.signedCookies as AuthCookies; // signed cookie
    // console.log('accessToken ---', accessToken);

    // if (accessToken) {
    //   return accessToken;
    // }

    // return null;
  },
});
