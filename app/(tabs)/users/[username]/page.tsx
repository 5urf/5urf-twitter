import Pagination from '@/components/common/Pagination';
import EmptyState from '@/components/layout/EmptyState';
import PageHeader from '@/components/layout/PageHeader';
import TweetList from '@/components/tweet/TweetList';
import { isCurrentUser } from '@/lib/auth';
import db from '@/lib/db';
import { formatToKorDateOnly } from '@/lib/format';
import {
  DEFAULT_PAGE_SIZE,
  getPageFromSearchParams,
  getPaginationParams,
} from '@/lib/pagination';
import { getUserByUsername } from '@/lib/user';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import { Metadata } from 'next';
import { unstable_cache as nextCache } from 'next/cache';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getUserTweets(userId: number, page: number, pageSize: number) {
  const { skip, take } = getPaginationParams(page, pageSize);

  const tweets = await db.tweet.findMany({
    where: { userId },
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

  const totalCount = await db.tweet.count({
    where: { userId },
  });

  return {
    tweets,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

const getCachedUserProfile = nextCache(
  async (username: string) => {
    return await getUserByUsername(username);
  },
  ['user-profile'],
  {
    tags: ['user-profile'],
    revalidate: 60,
  }
);

interface IUserProfilePageProps {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: Pick<IUserProfilePageProps, 'params'>): Promise<Metadata> {
  const { username } = await params;
  const decodeUsername = decodeURIComponent(username);

  return {
    title: `${decodeUsername}의 프로필`,
    description: `${decodeUsername}님의 이야기와 활동을 확인해보세요.`,
    openGraph: {
      title: `${decodeUsername} | 5urf Twitter`,
      description: `${decodeUsername}님의 이야기와 활동을 확인해보세요.`,
    },
  };
}

export default async function UserProfilePage({
  params,
  searchParams,
}: IUserProfilePageProps) {
  const { username } = await params;

  const decodeUsername = decodeURIComponent(username);

  const page = await getPageFromSearchParams(searchParams);
  const pageSize = DEFAULT_PAGE_SIZE;

  const user = await getCachedUserProfile(decodeUsername);
  if (!user) notFound();

  const { tweets, totalPages } = await getUserTweets(user.id, page, pageSize);
  const isOwner = await isCurrentUser(user.id);

  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <PageHeader title="PROFILE" />
      <div className="retro-container mb-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-[var(--accent-primary)]">
            {user.username}
          </h1>
          {isOwner && (
            <Link
              href={`/users/${user.username}/edit`}
              className={cn(
                'retro-button flex items-center gap-1 px-4 py-2 text-sm',
                'border-[var(--accent-primary)] bg-[var(--accent-primary)]',
                'text-[var(--button-text-on-accent)] transition-colors',
                'hover:border-[var(--accent-secondary)] hover:bg-[var(--accent-secondary)]'
              )}
            >
              <Pencil className="mr-1 size-4" />
              <p>프로필 편집</p>
            </Link>
          )}
        </div>
        {user.bio && <p className="mt-3 whitespace-pre-wrap">{user.bio}</p>}
        <div className="mt-4 text-sm text-[var(--text-secondary)]">
          가입일: {formatToKorDateOnly(user.created_at)}
        </div>
      </div>

      <h2
        className={cn(
          'mb-4 text-lg',
          'text-[var(--text-primary)] dark:text-[var(--accent-primary)]'
        )}
      >
        작성한 트윗
      </h2>
      {tweets.length > 0 ? (
        <>
          <TweetList tweets={tweets} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath={`/users/${username}`}
          />
        </>
      ) : (
        <EmptyState title="작성한 트윗이 없습니다." />
      )}
    </main>
  );
}
