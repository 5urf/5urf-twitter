import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { Prisma } from '@prisma/client';

export async function getCurrentUser<T extends Prisma.UserSelect>(
  select: T
): Promise<Prisma.UserGetPayload<{ select: T }> | null> {
  const session = await getSession();

  if (!session.id) {
    return null;
  }

  return await db.user.findUnique({
    where: { id: session.id },
    select,
  });
}

export async function getCurrentUsername(): Promise<string> {
  try {
    const user = await getCurrentUser({ username: true });
    return user?.username || '';
  } catch (error) {
    console.error('Error fetching username:', error);
    return '';
  }
}

export async function getUserByUsername(username: string) {
  const user = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      email: true,
      bio: true,
      created_at: true,
    },
  });

  return user;
}
