'use server';

import { TWEET_VALIDATION } from '@/lib/constants';
import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { FormActionState } from '@/types/formActionState';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

export async function likeTweet(tweetId: number) {
  const session = await getSession();

  const userId = session.id!;

  try {
    await db.like.create({
      data: {
        userId,
        tweetId,
      },
    });

    revalidateTag(`tweet-like-${tweetId}`);
  } catch (error) {
    console.error(error);
  }
}

export async function disLikeTweet(tweetId: number) {
  const session = await getSession();

  const userId = session.id!;

  try {
    await db.like.delete({
      where: {
        userId_tweetId: {
          userId,
          tweetId,
        },
      },
    });

    revalidateTag(`tweet-like-${tweetId}`);
  } catch (error) {
    console.error(error);
  }
}

const ResponseSchema = z.object({
  content: z
    .string({
      required_error: TWEET_VALIDATION.ERROR_MESSAGES.REQUIRED,
    })
    .min(TWEET_VALIDATION.MIN_LENGTH, TWEET_VALIDATION.ERROR_MESSAGES.TOO_SHORT)
    .max(TWEET_VALIDATION.MAX_LENGTH, TWEET_VALIDATION.ERROR_MESSAGES.TOO_LONG),
  tweetId: z.coerce.number(),
});

export async function addResponse(
  _: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const session = await getSession();
  const userId = session.id!;

  const data = {
    content: formData.get('content'),
    tweetId: formData.get('tweetId'),
  };

  const result = await ResponseSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  }

  try {
    await db.response.create({
      data: {
        content: result.data.content,
        userId,
        tweetId: result.data.tweetId,
      },
    });

    revalidateTag(`tweet-responses-${result.data.tweetId}`);

    return {};
  } catch (error) {
    console.error(error);
    return {
      formErrors: ['댓글 추가에 실패했습니다. 다시 시도해 주세요.'],
    };
  }
}
