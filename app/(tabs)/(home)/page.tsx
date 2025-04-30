import AddTweet from '@/components/ui/ AddTweet';
import Pagination from '@/components/ui/Pagination';
import TweetList from '@/components/ui/TweetList';
import db from '@/lib/db';
import { Prisma } from '@prisma/client';

async function getTotalPages(pageSize: number) {
  const totalTweets = await db.tweet.count();
  const totalPages = Math.ceil(totalTweets / pageSize);

  return totalPages;
}

async function getTweets(page: number, pageSize: number) {
  const tweets = await db.tweet.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return tweets;
}

export type Tweets = Prisma.PromiseReturnType<typeof getTweets>;

interface IHomePagePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: IHomePagePageProps) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const pageSize = 10;

  const [totalPages, tweets] = await Promise.all([
    getTotalPages(pageSize),
    getTweets(page, pageSize),
  ]);

  return (
    <main className="mx-auto max-w-lg px-4 pb-10 pt-10">
      <h1 className="mb-10 text-2xl font-bold">홈</h1>
      <AddTweet />
      <TweetList tweets={tweets} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}
