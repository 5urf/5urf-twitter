import Pagination from '@/components/ui/Pagination';
import TweetList from '@/components/ui/TweetList';
import { isCurrentUser } from '@/lib/auth';
import db from '@/lib/db';
import { formatToKorDateOnly } from '@/lib/format';
import {
  DEFAULT_PAGE_SIZE,
  getPageFromSearchParams,
  getPaginationParams,
} from '@/lib/pagination';
import { getUserByUsername } from '@/lib/user';
import { Pencil } from 'lucide-react';
import { Metadata } from 'next';
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

  const user = await getUserByUsername(decodeUsername);
  if (!user) notFound();

  const { tweets, totalPages } = await getUserTweets(user.id, page, pageSize);
  const isOwner = await isCurrentUser(user.id);

  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <h1 className="mb-6 text-2xl text-blue-600">PROFILE</h1>
      <div className="retro-container mb-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-blue-600">{user.username}</h1>
          {isOwner && (
            <Link
              href={`/users/${user.username}/edit`}
              className="retro-button flex items-center gap-1 border-blue-500 bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:border-blue-600 hover:bg-blue-600"
            >
              <Pencil className="mr-1 size-4" />
              <p>프로필 편집</p>
            </Link>
          )}
        </div>
        {user.bio && <p className="mt-3 whitespace-pre-wrap">{user.bio}</p>}
        <div className="mt-4 text-sm text-gray-500">
          가입일: {formatToKorDateOnly(user.created_at)}
        </div>
      </div>

      <h2 className="mb-4 text-lg text-blue-600">작성한 트윗</h2>
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
        <div className="retro-container p-6 text-center">
          <p className="text-gray-600">작성한 트윗이 없습니다.</p>
        </div>
      )}
    </main>
  );
}
