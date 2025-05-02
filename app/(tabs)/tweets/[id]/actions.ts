'use server';

import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { revalidateTag } from 'next/cache';

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
