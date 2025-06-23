'use client';

import { disLikeTweet, likeTweet } from '@/app/(tabs)/tweets/[id]/actions';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useOptimistic, useTransition } from 'react';

interface ILikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: ILikeButtonProps) {
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
        'retro-button flex items-center border-transparent bg-transparent px-2 py-1 transition-colors',
        'text-content-secondary',
        state.isLiked ? 'text-status-error' : 'hover:text-status-error',
        isPending && 'cursor-not-allowed opacity-70'
      )}
    >
      <Heart
        className={cn(
          'size-5',
          state.isLiked && 'fill-status-error text-statusfill-status-error'
        )}
      />
      <span className="ml-1">{state.likeCount}</span>
    </button>
  );
}
