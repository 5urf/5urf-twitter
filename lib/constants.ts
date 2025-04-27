export const ACCOUNT_VALIDATION = {
  PATTERNS: {
    EMAIL_DOMAIN: /@zod\.com$/,
    CONTAINS_NUMBER: /\d/,
  },

  MIN_LENGTH: {
    USERNAME: 5,
    PASSWORD: 10,
  },

  ERROR_MESSAGES: {
    EMAIL: {
      REQUIRED: 'Email is required',
      INVALID_TYPE: 'Email must be a string',
      INVALID_FORMAT: 'Invalid email format',
      DOMAIN: 'Only @zod.com emails are allowed',
      DUPLICATE: 'This username is already taken',
    },
    USERNAME: {
      REQUIRED: 'Username is required',
      INVALID_TYPE: 'Username must be a string',
      TOO_SHORT: 'Username should be at least 5 characters long.',
      DUPLICATE: 'This email is already taken',
    },
    PASSWORD: {
      REQUIRED: 'Password is required',
      INVALID_TYPE: 'Password must be a string',
      TOO_SHORT: 'Password should be at least 10 characters long',
      NO_NUMBER: 'Password should contain at least one number (0123456789)',
      CONFIRM: 'Both passwords should be the same!',
    },
  },
};
