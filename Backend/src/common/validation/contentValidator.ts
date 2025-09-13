import { checkSchema } from 'express-validator';

export const contentValidator = checkSchema({
  contentType: {
    in: ['body'],
    isIn: {
      options: [
        [
          'Blog Post',
          'Instagram Caption',
          'Email Newsletter',
          'Product Description',
        ],
      ],
      errorMessage: 'Please select a valid content goal',
    },
    notEmpty: {
      errorMessage: 'Content type is required',
    },
  },
  topic: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Topic is required',
    },
    isLength: {
      options: { min: 2 },
      errorMessage: 'Topic must be at least 2 characters',
    },
  },
  keywords: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Keywords must be a string',
    },
  },
  tone: {
    in: ['body'],
    isIn: {
      options: [['Friendly', 'Professional', 'Casual']],
      errorMessage: 'Please select a valid tone',
    },
    notEmpty: {
      errorMessage: 'Tone is required',
    },
  },
  language: {
    in: ['body'],
    isIn: {
      options: [['English', 'Hindi', 'Marathi']],
      errorMessage: 'Please select a valid language',
    },
    notEmpty: {
      errorMessage: 'Language is required',
    },
  },
});
