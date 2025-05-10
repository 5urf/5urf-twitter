'use server';

import { TWEET_VALIDATION } from '@/lib/constants';
import db from '@/lib/db';
import { validateTweetOwnership } from '@/lib/tweet';
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

  const validation = await validateTweetOwnership(tweetId);
  if (!validation.success) {
    return {
      formErrors: [validation.error],
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

export async function deleteTweet(tweetId: number) {
  try {
    const validation = await validateTweetOwnership(tweetId);
    if (!validation.success) {
      return { success: false, error: validation.error };
    }

    await db.tweet.delete({
      where: { id: tweetId },
    });

    return {
      success: true,
      message: '트윗이 삭제되었습니다.',
    };
  } catch (error) {
    console.error('Tweet delete error:', error);
    return {
      success: false,
      error: '트윗 삭제 중 오류가 발생했습니다.',
    };
  }
}
