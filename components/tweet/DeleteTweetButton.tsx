'use client';

import { deleteTweet } from '@/app/(tabs)/tweets/[id]/edit/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface IDeleteTweetButtonProps {
  tweetId: number;
}

export default function DeleteTweetButton({
  tweetId,
}: IDeleteTweetButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;

    const confirmed = window.confirm('정말로 트윗을 삭제하시겠습니까?');
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const result = await deleteTweet(tweetId);

      if (!result.success) {
        toast.error(result.error);
        setIsDeleting(false);
        return;
      }

      toast.success(result.message);
      router.push('/');
    } catch (error) {
      toast.error('트윗 삭제 중 오류가 발생했습니다');
      console.error(error);
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="retro-button border-[var(--error)] bg-[var(--error)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--error)] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? '삭제 중...' : '삭제'}
    </button>
  );
}
