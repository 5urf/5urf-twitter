import { isCurrentUser } from '@/lib/auth';
import db from '@/lib/db';

type ValidationResult =
  | { success: true; tweet: { userId: number } }
  | { success: false; error: string };

export async function validateTweetOwnership(
  tweetId: number
): Promise<ValidationResult> {
  const tweet = await db.tweet.findUnique({
    where: { id: tweetId },
    select: { userId: true },
  });

  if (!tweet) {
    return {
      success: false,
      error: '트윗을 찾을 수 없습니다.',
    };
  }

  const isOwner = await isCurrentUser(tweet.userId);
  if (!isOwner) {
    return {
      success: false,
      error: '이 트윗에 대한 권한이 없습니다.',
    };
  }

  return {
    success: true,
    tweet,
  };
}
