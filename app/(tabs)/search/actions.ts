'use server';

import db from '@/lib/db';

export async function searchTweets(query: string, page: number = 1) {
  if (!query.trim()) return { tweets: [], totalPages: 1 };

  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const where = {
    OR: [
      { tweet: { contains: query } },
      { user: { username: { contains: query } } },
    ],
  };

  const totalCount = await db.tweet.count({ where });

  const tweets = await db.tweet.findMany({
    where,
    include: {
      user: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          likes: true,
          responses: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
    skip,
    take: pageSize,
  });

  return {
    tweets,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}
