import { Tweets } from '@/app/(tabs)/(home)/page';
import { formatToKorDate } from '@/lib/format';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface ITweetListProps {
  tweets: Tweets;
  className?: string;
  emptyMessage?: string;
}

const TweetList = ({
  tweets,
  className,
  emptyMessage = 'tweet이 없습니다',
}: ITweetListProps) => {
  if (tweets.length === 0) {
    return <p className="text-center text-gray-500">{emptyMessage}</p>;
  }

  return (
    <ul className={cn('space-y-4', className)}>
      {tweets.map((tweet) => (
        <li key={tweet.id} className="retro-container p-4">
          <Link
            href={`/tweets/${tweet.id}`}
            className="-m-4 block p-4 transition hover:bg-gray-50"
          >
            <div className="font-medium text-blue-600">
              {tweet.user.username}
            </div>
            <p className="mt-1 whitespace-pre-wrap">{tweet.tweet}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>{formatToKorDate(tweet.created_at)}</span>
              <span className="flex items-center">
                <Heart className="mr-1 h-4 w-4" />
                {tweet._count.likes}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TweetList;
