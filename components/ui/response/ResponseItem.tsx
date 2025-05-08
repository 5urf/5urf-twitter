import { formatToKorDate } from '@/lib/format';
import Link from 'next/link';

interface IResponseItemProps {
  content: string;
  created_at: Date;
  username: string;
  isPending?: boolean;
}

export default function ResponseItem({
  content,
  created_at,
  username,
  isPending = false,
}: IResponseItemProps) {
  return (
    <div className="p-4">
      <div className="mb-2 flex items-center gap-2">
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
      <p className="whitespace-pre-wrap">{content}</p>
      <div className="mt-2 text-xs text-gray-500">
        {formatToKorDate(created_at)}
      </div>
    </div>
  );
}
