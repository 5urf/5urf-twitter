import Pagination from '@/components/ui/Pagination';
import AddTweet from '@/components/ui/tweet/AddTweet';
import TweetList from '@/components/ui/TweetList';
import db from '@/lib/db';
import {
  DEFAULT_PAGE_SIZE,
  getPageFromSearchParams,
  getPaginationParams,
} from '@/lib/pagination';
import { Prisma } from '@prisma/client';
import { Metadata } from 'next';

async function getTotalPages(pageSize: number) {
  const totalTweets = await db.tweet.count();
  const totalPages = Math.ceil(totalTweets / pageSize);

  return totalPages;
}

async function getTweets(page: number, pageSize: number) {
  const { skip, take } = getPaginationParams(page, pageSize);

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

  return tweets;
}

export type Tweets = Prisma.PromiseReturnType<typeof getTweets>;

interface IHomePagePageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  title: '홈',
  description: '최신 소식을 확인하고, 나만의 이야기를 공유해보세요.',
  openGraph: {
    title: '5urf Twitter | 홈',
    description: '최신 소식을 확인하고, 나만의 이야기를 공유해보세요.',
  },
};

export default async function HomePage({ searchParams }: IHomePagePageProps) {
  const page = await getPageFromSearchParams(searchParams);
  const pageSize = DEFAULT_PAGE_SIZE;

  const [totalPages, tweets] = await Promise.all([
    getTotalPages(pageSize),
    getTweets(page, pageSize),
  ]);

  return (
    <main className="mx-auto max-w-lg px-4 pb-10 pt-10">
      <h1 className="mb-10 text-2xl tracking-wide text-[var(--accent-primary)]">
        HOME
      </h1>
      <AddTweet />
      <TweetList tweets={tweets} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}
