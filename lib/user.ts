import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { Prisma } from '@prisma/client';

export async function getCurrentUser<T extends Prisma.UserSelect>(
  select: T
): Promise<Prisma.UserGetPayload<{ select: T }> | null> {
  const session = await getSession();

  return await db.user.findUnique({
    where: { id: session.id },
    select,
  });
}

export async function getCurrentUsername(): Promise<string> {
  const user = await getCurrentUser({ username: true });
  return user!.username;
}
