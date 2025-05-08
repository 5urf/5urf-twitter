'use server';

import { ACCOUNT_VALIDATION } from '@/lib/constants';
import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { FormActionState } from '@/types/formActionState';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const loginFormSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(
      checkEmailExists,
      ACCOUNT_VALIDATION.ERROR_MESSAGES.EMAIL.NOT_FOUND
    ),
  password: z.string({
    required_error: ACCOUNT_VALIDATION.ERROR_MESSAGES.EMAIL.REQUIRED,
  }),
});

export async function login(
  _: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = await loginFormSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const user = await db.user.findUnique({
    where: { email: result.data.email },
    select: { id: true, password: true },
  });

  const passwordOk = await bcrypt.compare(
    result.data.password,
    user!.password ?? ''
  );

  if (!passwordOk) {
    return {
      fieldErrors: {
        password: ['Wrong password.'],
        email: [],
      },
    };
  }

  const session = await getSession();
  session.id = user!.id;
  await session.save();
  redirect('/');
}
