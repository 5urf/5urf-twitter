import db from '@/lib/db';
import { formatToKorDate } from '@/lib/format';
import { getSession } from '@/lib/session';
import { ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) return session.id === userId;
  return false;
}

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

interface ITweetDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TweetDetailPage({
  params,
}: ITweetDetailPageProps) {
  const id = Number((await params).id);

  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getTweet(id);

  if (!tweet) return notFound();

  const isOwner = await getIsOwner(tweet.userId);

  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center text-gray-700 transition-colors hover:text-gray-300"
        >
          <ArrowLeft className="mr-1 size-5" />
          <span>뒤로가기</span>
        </Link>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <div className="flex items-center gap-3 border-b border-gray-200 p-5">
          <div className="font-medium">
            <span>{tweet.user.username}</span>
          </div>
        </div>
        <div className="p-5">
          <p className="whitespace-pre-wrap text-lg">{tweet.tweet}</p>
          <div className="mt-4 text-xs text-gray-500">
            {formatToKorDate(tweet.created_at)}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <button className="flex items-center text-gray-500">
              <Heart className="size-5" />
              <span className="ml-1">{tweet._count.likes}</span>
            </button>
          </div>
          {isOwner && (
            <div className="space-x-2">
              <button className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white">
                수정
              </button>
              <button className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white">
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
