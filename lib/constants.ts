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
      REQUIRED: '이메일은 필수 입력 항목입니다',
      INVALID_TYPE: '이메일은 문자열이어야 합니다',
      INVALID_FORMAT: '올바르지 않은 이메일 형식입니다',
      DOMAIN: '@zod.com 이메일만 허용됩니다',
      DUPLICATE: '이 이메일은 이미 사용 중입니다',
      NOT_FOUND: '해당 이메일로 등록된 계정이 존재하지 않습니다',
    },
    USERNAME: {
      REQUIRED: '사용자 이름은 필수 입력 항목입니다',
      INVALID_TYPE: '사용자 이름은 문자열이어야 합니다',
      TOO_SHORT: '사용자 이름은 최소 5자 이상이어야 합니다',
      DUPLICATE: '이 사용자 이름은 이미 사용 중입니다',
    },
    PASSWORD: {
      REQUIRED: '비밀번호는 필수 입력 항목입니다',
      INVALID_TYPE: '비밀번호는 문자열이어야 합니다',
      TOO_SHORT: '비밀번호는 최소 10자 이상이어야 합니다',
      NO_NUMBER: '비밀번호는 최소 하나의 숫자(0-9)를 포함해야 합니다',
      CONFIRM: '비밀번호가 일치하지 않습니다',
      WRONG: '잘못된 비밀번호입니다',
    },
  },
};

export const TWEET_VALIDATION = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 200,

  ERROR_MESSAGES: {
    REQUIRED: '트윗 내용은 필수 입력 항목입니다',
    TOO_SHORT: '트윗 내용은 필수 입력 항목입니다',
    TOO_LONG: '트윗은 최대 200자까지 입력 가능합니다',
  },
};
