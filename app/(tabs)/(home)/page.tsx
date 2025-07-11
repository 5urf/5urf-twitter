import Pagination from '@/components/common/Pagination';
import PageHeader from '@/components/layout/PageHeader';
import AddTweet from '@/components/tweet/AddTweet';
import TweetList from '@/components/tweet/TweetList';
import db from '@/lib/db';
import {
  DEFAULT_PAGE_SIZE,
  getPageFromSearchParams,
  getPaginationParams,
} from '@/lib/pagination';
import { TweetWithCounts } from '@/types/database';
import { Metadata } from 'next';

async function getTotalPages(pageSize: number) {
  const totalTweets = await db.tweet.count();
  const totalPages = Math.ceil(totalTweets / pageSize);

  return totalPages;
}

async function getTweets(
  page: number,
  pageSize: number
): Promise<TweetWithCounts[]> {
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
      <PageHeader title="HOME" />
      <AddTweet />
      <TweetList tweets={tweets} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}
