'use server';

import { TWEET_VALIDATION } from '@/lib/constants';
import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { FormActionState } from '@/types/formActionState';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const tweetSchema = z.object({
  tweet: z
    .string({
      required_error: TWEET_VALIDATION.ERROR_MESSAGES.REQUIRED,
    })
    .min(TWEET_VALIDATION.MIN_LENGTH, TWEET_VALIDATION.ERROR_MESSAGES.TOO_SHORT)
    .max(TWEET_VALIDATION.MAX_LENGTH, TWEET_VALIDATION.ERROR_MESSAGES.TOO_LONG),
});

export async function addTweet(
  _: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const data = {
    tweet: formData.get('tweet'),
  };

  const result = tweetSchema.safeParse(data);
  if (!result.success) return result.error.flatten();

  const session = await getSession();

  if (!session.id) redirect('/log-in');

  const tweet = await db.tweet.create({
    data: {
      tweet: result.data.tweet,
      user: {
        connect: { id: session.id },
      },
    },
    select: {
      id: true,
    },
  });
  redirect(`/tweets/${tweet.id}`);
}
