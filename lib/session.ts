import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface ISessionContent {
  id?: number;
}

export async function getSession() {
  return await getIronSession<ISessionContent>(await cookies(), {
    cookieName: 'karrot-session',
    password: process.env.COOKIE_PASSWORD!,
  });
}
