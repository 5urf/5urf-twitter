'use server';

import { z } from 'zod';

const loginFormSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('Invalid email format')
    .trim()
    .toLowerCase()
    .regex(/@zod\.com$/, 'Only @zod.com emails are allowed'),
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .min(5, 'Username should be at least 5 characters long.')
    .trim(),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(10, 'Password should be at least 10 characters long')
    .regex(/\d/, 'Password should contain at least one number (0123456789)'),
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
