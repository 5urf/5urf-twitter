'use client';

import { disLikeTweet, likeTweet } from '@/app/(tabs)/tweets/[id]/actions';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useOptimistic, useTransition } from 'react';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();

  const [state, updateState] = useOptimistic(
    { isLiked, likeCount },
    (previousState) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );

  const handleLike = () => {
    if (isPending) return;

    startTransition(async () => {
      updateState(undefined);

      if (state.isLiked) {
        await disLikeTweet(tweetId);
      } else {
        await likeTweet(tweetId);
      }
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={cn(
        'flex items-center text-gray-500 transition-colors',
        state.isLiked ? 'text-red-500' : 'hover:text-red-500',
        isPending && 'cursor-not-allowed opacity-70'
      )}
    >
      <Heart
        className={cn('size-5', state.isLiked && 'fill-red-500 text-red-500')}
      />
      <span className="ml-1">{state.likeCount}</span>
    </button>
  );
}
