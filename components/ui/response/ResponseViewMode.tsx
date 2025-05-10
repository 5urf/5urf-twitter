'use client';

import { formatToKorDate } from '@/lib/format';
import Link from 'next/link';

interface IResponseViewModeProps {
  id: number;
  content: string;
  created_at: Date;
  username: string;
  isPending?: boolean;
  isOwner?: boolean;
  onEditClickAction: () => void;
}

export default function ResponseViewMode({
  id,
  content,
  created_at,
  username,
  isPending = false,
  isOwner = false,
  onEditClickAction,
}: IResponseViewModeProps) {
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
            <span className="text-xs text-blue-500">(게시 중...)</span>
          )}
        </div>

        {isOwner && !isPending && (
          <div className="space-x-2">
            <button
              onClick={onEditClickAction}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              수정
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
