'use client';

import { deleteResponse } from '@/app/(tabs)/tweets/[id]/actions';
import { formatToKorDate } from '@/lib/format';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { startTransition, useState } from 'react';
import { toast } from 'sonner';

interface IResponseViewModeProps {
  id: number;
  content: string;
  created_at: Date;
  username: string;
  isPending?: boolean;
  isOwner?: boolean;
  onEditClickAction: () => void;
  onDeleteClickAction?: (id: number) => void;
}

export default function ResponseViewMode({
  id,
  content,
  created_at,
  username,
  isPending = false,
  isOwner = false,
  onEditClickAction,
  onDeleteClickAction,
}: IResponseViewModeProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting || !onDeleteClickAction) return;

    const confirmed = window.confirm('정말로 댓글을 삭제하시겠습니까?');
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const result = await deleteResponse(id);

      if (!result.success) {
        toast.error(result.error);
        setIsDeleting(false);
        return;
      }

      toast.success(result.message);

      startTransition(() => {
        onDeleteClickAction(id);
      });
    } catch (error) {
      toast.error('댓글 삭제 중 오류가 발생했습니다');
      console.error(error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href={`/users/${encodeURIComponent(username)}`}
            className="username-link"
          >
            {username}
          </Link>
          {isPending && (
            <span className="text-xs text-brand-primary">(게시 중...)</span>
          )}
        </div>

        {isOwner && !isPending && (
          <div className="space-x-2">
            <button
              onClick={onEditClickAction}
              className={cn(
                'text-sm transition-colors',
                'text-brand-primary hover:text-brand-secondary'
              )}
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={cn(
                'text-sm transition-colors',
                'text-status-error hover:text-status-error',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </button>
          </div>
        )}
      </div>
      <p className="whitespace-pre-wrap">{content}</p>
      <div className="mt-2 text-xs text-gray-500">
        {formatToKorDate(created_at)}
      </div>
    </div>
  );
}
