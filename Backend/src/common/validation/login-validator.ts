import { checkSchema } from 'express-validator';
import { emailValidator, passwordValidator } from './common-validators';

export default checkSchema({
  ...emailValidator,
  ...passwordValidator,
});
