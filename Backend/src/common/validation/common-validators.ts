import { Schema } from 'express-validator';

// Common Validators
export const userNameValidator: Schema = {
  userName: {
    in: ['body'],
    trim: true,
    optional: false,
    notEmpty: {
      errorMessage: 'Name is required',
    },
    matches: {
      options: [/^[a-zA-Z0-9]+$/],
      errorMessage: 'Username must only contain alphanumeric characters',
    },
    isString: {
      errorMessage: 'Username must be a string',
    },
    isLength: {
      options: { min: 3, max: 15 },
      errorMessage: 'Username must be between 3 and 15 characters',
    },
  },
};

export const emailValidator: Schema = {
  email: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'Email is Required',
    },
    isEmail: {
      errorMessage: 'Invalid email format',
    },
    optional: false,
    matches: {
      options: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/],
      errorMessage: 'Email does not match the required format',
    },
  },
};

export const passwordValidator: Schema = {
  password: {
    in: ['body'],
    optional: false,
    trim: true,
    notEmpty: {
      errorMessage: 'Password is required',
    },
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password must be at least 8 characters long',
    },
    matches: {
      options: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/],
      errorMessage:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  },
};

export const nameValidator = (fieldName: string): Schema => ({
  [fieldName]: {
    in: ['body'],
    trim: true,
    optional: false,
    isString: {
      errorMessage: `${fieldName} must be a string`,
    },
    notEmpty: {
      errorMessage: `${fieldName} is required`,
    },
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: `${fieldName} must be between 1 and 50 characters`,
    },
    matches: {
      options: [/^[A-Za-z]+$/],
      errorMessage: `${fieldName} must only contain alphabets`,
    },
  },
});
