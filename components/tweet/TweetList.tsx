import { Tweets } from '@/app/(tabs)/(home)/page';
import { formatToKorDate } from '@/lib/format';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import EmptyState from '../layout/EmptyState';

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
    return <EmptyState title={emptyMessage} />;
  }

  return (
    <ul className={cn('space-y-4', className)}>
      {tweets.map((tweet) => (
        <li key={tweet.id} className="retro-container p-4">
          <Link
            href={`/tweets/${tweet.id}`}
            className={cn(
              '-m-4 block p-4 transition',
              'hover:bg-interaction-primary'
            )}
          >
            <div className="text-brand-primary font-medium">
              {tweet.user.username}
            </div>
            <p className="mt-1 whitespace-pre-wrap">{tweet.tweet}</p>
            <div className="text-content-secondary mt-2 flex items-center justify-between text-xs">
              <span>{formatToKorDate(tweet.created_at)}</span>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <MessageCircle className="mr-1 h-4 w-4" />
                  {tweet._count.responses}
                </span>
                <span className="flex items-center">
                  <Heart className="mr-1 h-4 w-4" />
                  {tweet._count.likes}
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TweetList;
