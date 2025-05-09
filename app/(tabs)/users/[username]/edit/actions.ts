'use server';

import { ACCOUNT_VALIDATION } from '@/lib/constants';
import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { FormActionState } from '@/types/formActionState';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const profileUpdateSchema = z
  .object({
    email: z
      .string({
        required_error: ACCOUNT_VALIDATION.ERROR_MESSAGES.EMAIL.REQUIRED,
        invalid_type_error:
          ACCOUNT_VALIDATION.ERROR_MESSAGES.EMAIL.INVALID_TYPE,
      })
      .email(ACCOUNT_VALIDATION.ERROR_MESSAGES.EMAIL.INVALID_FORMAT)
      .trim()
      .toLowerCase()
      .regex(
        ACCOUNT_VALIDATION.PATTERNS.EMAIL_DOMAIN,
        ACCOUNT_VALIDATION.ERROR_MESSAGES.EMAIL.DOMAIN
      ),
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
    bio: z.string().optional(),
  })
  .superRefine(async ({ email, username }, ctx) => {
    const session = await getSession();
    const currentUser = await db.user.findUnique({
      where: { id: session.id },
      select: { email: true, username: true },
    });

    if (username !== currentUser?.username) {
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
    }

    if (email !== currentUser?.email) {
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
    }
  });

const passwordUpdateSchema = z
  .object({
    currentPassword: z.string({
      required_error: '현재 비밀번호를 입력해주세요',
    }),
    newPassword: z
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
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      message: ACCOUNT_VALIDATION.ERROR_MESSAGES.PASSWORD.CONFIRM,
      path: ['confirmPassword'],
    }
  );

export async function updateProfile(
  _: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const session = await getSession();
  const userId = session.id;

  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    bio: formData.get('bio')?.toString() || '',
  };

  const result = await profileUpdateSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  }

  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        email: result.data.email,
        username: result.data.username,
        bio: result.data.bio,
      },
    });

    return {
      message: '프로필이 성공적으로 변경되었습니다.',
    };
  } catch (error) {
    console.error('Profile update error:', error);
    return {
      formErrors: ['프로필 변경 중 오류가 발생했습니다.'],
    };
  }
}

export async function updatePassword(
  _: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const session = await getSession();
  const userId = session.id;

  const data = {
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const result = passwordUpdateSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });

  const currentPasswordMatches = await bcrypt.compare(
    result.data.currentPassword,
    user!.password
  );

  if (!currentPasswordMatches) {
    return {
      fieldErrors: {
        currentPassword: ['현재 비밀번호가 일치하지 않습니다.'],
      },
    };
  }

  const hashedNewPassword = await bcrypt.hash(result.data.newPassword, 12);

  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedNewPassword,
      },
    });

    return {
      message: '비밀번호가 성공적으로 변경되었습니다.',
    };
  } catch (error) {
    console.error('Password update error:', error);
    return {
      formErrors: ['비밀번호 변경 중 오류가 발생했습니다.'],
    };
  }
}
