import LikeButton from '@/components/ui/LikeButton';
import ResponseContainer from '@/components/ui/response/ResponseContainer';
import { isCurrentUser } from '@/lib/auth';
import db from '@/lib/db';
import { formatToKorDate } from '@/lib/format';
import { getSession } from '@/lib/session';
import { getCurrentUsername } from '@/lib/user';
import { ArrowLeft } from 'lucide-react';
import { unstable_cache as nextCache } from 'next/cache';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  return tweet;
}

const getCachedTweet = nextCache(getTweet, ['tweet-detail'], {
  tags: ['tweet-detail'],
  revalidate: 60,
});

async function getLikeStatus(tweetId: number, userId: number) {
  const isLike = await db.like.findUnique({
    where: {
      userId_tweetId: {
        userId,
        tweetId,
      },
    },
  });

  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });

  return {
    likeCount,
    isLiked: Boolean(isLike),
  };
}

async function getResponses(tweetId: number) {
  const responses = await db.response.findMany({
    where: {
      tweetId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  return responses;
}

async function getCachedResponses(tweetId: number) {
  const cachedOperation = nextCache(getResponses, ['tweet-responses'], {
    tags: [`tweet-responses-${tweetId}`],
  });
  return cachedOperation(tweetId);
}

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(getLikeStatus, ['tweet-like-status'], {
    tags: [`tweet-like-${tweetId}`],
  });
  return cachedOperation(tweetId, userId!);
}

interface ITweetDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TweetDetailPage({
  params,
}: ITweetDetailPageProps) {
  const id = Number((await params).id);

  if (isNaN(id)) return notFound();

  const tweet = await getCachedTweet(id);

  if (!tweet) return notFound();

  const isOwner = await isCurrentUser(tweet.userId);

  const { likeCount, isLiked } = await getCachedLikeStatus(id);

  const responses = await getCachedResponses(id);

  const currentUsername = await getCurrentUsername();

  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 transition-colors hover:text-blue-800"
        >
          <ArrowLeft className="mr-1 size-5" />
          <span className="font-pixel">BACK</span>
        </Link>
      </div>
      <div className="retro-container overflow-hidden p-0">
        <div className="border-b-2 border-gray-300 p-5">
          <div className="font-medium text-blue-600">
            <span>{tweet.user.username}</span>
          </div>
        </div>
        <div className="border-b-2 border-gray-300 p-5">
          <p className="whitespace-pre-wrap text-lg">{tweet.tweet}</p>
          <div className="mt-4 text-xs text-gray-500">
            {formatToKorDate(tweet.created_at)}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LikeButton
                isLiked={isLiked}
                likeCount={likeCount}
                tweetId={id}
              />
            </div>
            {isOwner && (
              <div className="space-x-2">
                <button className="retro-button border-blue-500 bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
                  수정
                </button>
                <button className="retro-button border-red-500 bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ResponseContainer
        initialResponses={responses}
        tweetId={id}
        currentUsername={currentUsername}
      />
    </main>
  );
}
