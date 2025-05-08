import { getSession } from '@/lib/session';

/**
 * @param userId 확인할 사용자 ID
 * @returns 현재 사용자가 소유자인지 여부 (boolean)
 */
export async function isCurrentUser(userId: number) {
  const session = await getSession();
  return Boolean(session.id) && session.id === userId;
}
