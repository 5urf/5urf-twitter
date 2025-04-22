'use server';

export type FormState = {
  fieldErrors?: {
    email?: string;
    username?: string;
    password?: string;
  };
  message?: string;
};

export async function handleForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await new Promise((res) => setTimeout(res, 1000));

  const password = formData.get('password');

  if (password === '12345') {
    return {
      message: 'Welcome back!',
    };
  } else {
    return {
      fieldErrors: {
        password: 'Wrong password',
      },
    };
  }
}
