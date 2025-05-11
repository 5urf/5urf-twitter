import BackButton from '@/components/ui/BackButton';
import EditTweetForm from '@/components/ui/tweet/EditTweetForm';
import { isCurrentUser } from '@/lib/auth';
import db from '@/lib/db';
import { Metadata } from 'next';
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
    },
  });

  if (!tweet) {
    return null;
  }

  const isOwner = await isCurrentUser(tweet.userId);
  if (!isOwner) {
    return null;
  }

  return tweet;
}

interface ITweetEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ITweetEditPageProps): Promise<Metadata> {
  const id = Number((await params).id);

  if (isNaN(id)) {
    return {
      title: '트윗 수정',
    };
  }

  const tweet = await getTweet(id);

  if (!tweet) {
    return {
      title: '트윗 수정',
    };
  }

  return {
    title: '트윗 수정',
    description: '작성한 트윗을 수정합니다.',
    openGraph: {
      title: '트윗 수정 | 5urf Twitter',
      description: '작성한 트윗을 수정합니다.',
    },
  };
}

export default async function TweetEditPage({ params }: ITweetEditPageProps) {
  const id = Number((await params).id);

  if (isNaN(id)) return notFound();

  const tweet = await getTweet(id);

  if (!tweet) return notFound();

  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <BackButton />
      <h1 className="mb-6 text-2xl text-blue-600">EDIT TWEET</h1>
      <EditTweetForm tweet={tweet} />
    </main>
  );
}
