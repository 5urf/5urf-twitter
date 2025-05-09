'use server';

import { isCurrentUser } from '@/lib/auth';
import { TWEET_VALIDATION } from '@/lib/constants';
import db from '@/lib/db';
import { FormActionState } from '@/types/formActionState';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const tweetEditSchema = z.object({
  tweet: z
    .string({
      required_error: TWEET_VALIDATION.ERROR_MESSAGES.REQUIRED,
    })
    .min(TWEET_VALIDATION.MIN_LENGTH, TWEET_VALIDATION.ERROR_MESSAGES.TOO_SHORT)
    .max(TWEET_VALIDATION.MAX_LENGTH, TWEET_VALIDATION.ERROR_MESSAGES.TOO_LONG),
});

export async function updateTweet(
  _: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const tweetId = Number(formData.get('tweetId'));
  const tweetContent = formData.get('tweet');

  if (isNaN(tweetId)) {
    return {
      formErrors: ['유효하지 않은 트윗입니다.'],
    };
  }

  const data = {
    tweet: tweetContent,
  };

  const result = tweetEditSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const { tweet } = result.data;

  const existingTweet = await db.tweet.findUnique({
    where: { id: tweetId },
    select: { userId: true },
  });

  if (!existingTweet) {
    return {
      formErrors: ['트윗을 찾을 수 없습니다.'],
    };
  }

  const isOwner = await isCurrentUser(existingTweet.userId);
  if (!isOwner) {
    return {
      formErrors: ['트윗을 수정할 권한이 없습니다.'],
    };
  }

  try {
    await db.tweet.update({
      where: { id: tweetId },
      data: { tweet },
    });

    revalidateTag('tweet-detail');

    return {
      message: '트윗이 수정되었습니다.',
      data: { tweetId },
    };
  } catch (error) {
    console.error('Tweet update error:', error);
    return {
      formErrors: ['트윗 수정 중 오류가 발생했습니다.'],
    };
  }
}
