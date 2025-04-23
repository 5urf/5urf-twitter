'use server';

import { LOGIN_VALIDATION } from '@/lib/constants';
import { z } from 'zod';

const loginFormSchema = z.object({
  email: z
    .string({
      required_error: LOGIN_VALIDATION.ERROR_MESSAGES.EMAIL.REQUIRED,
      invalid_type_error: LOGIN_VALIDATION.ERROR_MESSAGES.EMAIL.INVALID_TYPE,
    })
    .email(LOGIN_VALIDATION.ERROR_MESSAGES.EMAIL.INVALID_FORMAT)
    .trim()
    .toLowerCase()
    .regex(
      LOGIN_VALIDATION.PATTERNS.EMAIL_DOMAIN,
      LOGIN_VALIDATION.ERROR_MESSAGES.EMAIL.DOMAIN
    ),
  username: z
    .string({
      required_error: LOGIN_VALIDATION.ERROR_MESSAGES.USERNAME.REQUIRED,
      invalid_type_error: LOGIN_VALIDATION.ERROR_MESSAGES.USERNAME.INVALID_TYPE,
    })
    .min(
      LOGIN_VALIDATION.MIN_LENGTH.USERNAME,
      LOGIN_VALIDATION.ERROR_MESSAGES.USERNAME.TOO_SHORT
    )
    .trim(),
  password: z
    .string({
      required_error: LOGIN_VALIDATION.ERROR_MESSAGES.PASSWORD.REQUIRED,
      invalid_type_error: LOGIN_VALIDATION.ERROR_MESSAGES.PASSWORD.INVALID_TYPE,
    })
    .min(
      LOGIN_VALIDATION.MIN_LENGTH.PASSWORD,
      LOGIN_VALIDATION.ERROR_MESSAGES.PASSWORD.TOO_SHORT
    )
    .regex(
      LOGIN_VALIDATION.PATTERNS.CONTAINS_NUMBER,
      LOGIN_VALIDATION.ERROR_MESSAGES.PASSWORD.NO_NUMBER
    ),
});

type FormResult = {
  fieldErrors?: z.inferFlattenedErrors<typeof loginFormSchema>['fieldErrors'];
  message?: string;
};

export async function handleForm(
  prevResult: FormResult,
  formData: FormData
): Promise<FormResult> {
  await new Promise((res) => setTimeout(res, 1000));

  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  };

  const result = loginFormSchema.safeParse(data);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  return {
    message: `Welcome back, ${result.data.username}!`,
  };
}
