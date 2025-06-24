'use server';

import db from '@/lib/db';
import { DEFAULT_PAGE_SIZE, getPaginationParams } from '@/lib/pagination';
import { SearchResult } from '@/types/database';

export async function searchTweets(
  query: string,
  page: number = 1
): Promise<SearchResult> {
  if (!query.trim()) return { tweets: [], totalPages: 1 };

  const pageSize = DEFAULT_PAGE_SIZE;
  const { skip, take } = getPaginationParams(page, pageSize);

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
    take,
  });

  return {
    tweets,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}
