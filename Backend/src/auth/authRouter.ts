import express, { RequestHandler } from 'express';
import {
  loginUser,
  logout,
  refresh,
  registerUser,
  self,
} from './authController';
import registerValidator from '../common/validation/register-validator';
import { validate } from '../common/validation/ValidationChain';
import loginValidator from '../common/validation/login-validator';
import authenticate from '../common/middleware/authenticate';
import parseRefreshToken from '../common/middleware/parseRefreshToken';
import validateRefreshToken from '../common/middleware/validateRefreshToken';

const router = express.Router();

router.post('/register', validate(registerValidator), registerUser);
router.post('/login', validate(loginValidator), loginUser);
router.get('/self', self as unknown as RequestHandler);
router.post(
  '/refresh',
  validateRefreshToken,
  refresh as unknown as RequestHandler,
);
router.post(
  '/logout',
  authenticate,
  parseRefreshToken,
  logout as unknown as RequestHandler,
);

export default router;
