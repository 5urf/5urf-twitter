'use server';

import { ACCOUNT_VALIDATION } from '@/lib/constants';
import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { FormActionState } from '@/types/formActionState';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const accountFormSchema = z
  .object({
    email: z
      .string({
        required_error: ACCOUNT_VALIDATION.ERROR_MESSAGES.EMAIL.REQUIRED,
        invalid_type_error:
          ACCOUNT_VALIDATION.ERROR_MESSAGES.EMAIL.INVALID_TYPE,
      })
      .email(ACCOUNT_VALIDATION.ERROR_MESSAGES.EMAIL.INVALID_FORMAT)
      .trim()
      .toLowerCase(),
    username: z
      .string({
        required_error: ACCOUNT_VALIDATION.ERROR_MESSAGES.USERNAME.REQUIRED,
        invalid_type_error:
          ACCOUNT_VALIDATION.ERROR_MESSAGES.USERNAME.INVALID_TYPE,
      })
      .min(
        ACCOUNT_VALIDATION.MIN_LENGTH.USERNAME,
        ACCOUNT_VALIDATION.ERROR_MESSAGES.USERNAME.TOO_SHORT
      )
      .trim(),
    password: z
      .string({
        required_error: ACCOUNT_VALIDATION.ERROR_MESSAGES.PASSWORD.REQUIRED,
        invalid_type_error:
          ACCOUNT_VALIDATION.ERROR_MESSAGES.PASSWORD.INVALID_TYPE,
      })
      .min(
        ACCOUNT_VALIDATION.MIN_LENGTH.PASSWORD,
        ACCOUNT_VALIDATION.ERROR_MESSAGES.PASSWORD.TOO_SHORT
      )
      .regex(
        ACCOUNT_VALIDATION.PATTERNS.CONTAINS_NUMBER,
        ACCOUNT_VALIDATION.ERROR_MESSAGES.PASSWORD.NO_NUMBER
      ),
    confirmPassword: z
      .string()
      .min(
        ACCOUNT_VALIDATION.MIN_LENGTH.PASSWORD,
        ACCOUNT_VALIDATION.ERROR_MESSAGES.PASSWORD.TOO_SHORT
      ),
  })
  .superRefine(async ({ email, username }, ctx) => {
    const existingUsername = await db.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (existingUsername) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ACCOUNT_VALIDATION.ERROR_MESSAGES.USERNAME.DUPLICATE,
        path: ['username'],
      });
    }

    const existingEmail = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingEmail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ACCOUNT_VALIDATION.ERROR_MESSAGES.EMAIL.DUPLICATE,
        path: ['email'],
      });
    }
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: ACCOUNT_VALIDATION.ERROR_MESSAGES.PASSWORD.CONFIRM,
    path: ['confirmPassword'],
  });

export async function createAccount(
  _: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const result = await accountFormSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 12);

  const user = await db.user.create({
    data: {
      username: result.data.username,
      email: result.data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });

  const session = await getSession();
  session.id = user.id;
  await session.save();

  redirect('/');
}
