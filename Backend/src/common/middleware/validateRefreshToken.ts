import { expressjwt } from 'express-jwt';
import { Request } from 'express';
import logger from '../config/logger';
import { configENV } from '../config/config';
import { AuthCookies, IRefreshTokenPayload } from '../../auth/authType';
import { RefreshToken } from '../../auth/models/RefreshTokenModel';

export default expressjwt({
  secret: configENV.refreshTokenSecret,
  algorithms: ['HS256'],
  // get refresh token
  getToken(req: Request) {
    const { refreshToken } = req.cookies as AuthCookies;
    if (!refreshToken) throw Error('not found refreshtoken');
    return refreshToken;
  },
  // validate to refresh token
  async isRevoked(req: Request, token) {
    try {
      const refreshToken = await RefreshToken.findOne({
        _id: (token?.payload as IRefreshTokenPayload).id,
        user: { _id: token?.payload.sub },
      });
      return refreshToken === null;
    } catch (error) {
      logger.error(`Error while getting the refresh token: ${error}`, {
        id: (token?.payload as IRefreshTokenPayload).id,
      });
    }
    return true;
  },
});
