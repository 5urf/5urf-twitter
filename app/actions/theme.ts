'use server';

import { cookies } from 'next/headers';

export async function setTheme(theme: 'light' | 'dark') {
  const cookieStore = await cookies();

  cookieStore.set('theme', theme, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 365, // 1년
    path: '/',
  });
}

export async function getTheme() {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');
  return theme?.value || 'light';
}
