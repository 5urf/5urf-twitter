import { cn } from '@/lib/utils';
import Link from 'next/link';

interface IProfileEditErrorProps {
  username: string;
}

export default function ProfileEditError({ username }: IProfileEditErrorProps) {
  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <div className="retro-container p-6 text-center">
        <p className={cn('text-[var(--error)]')}>
          프로필 정보를 불러오는데 실패했습니다.
        </p>
        <Link
          href={`/users/${username}`}
          className={cn(
            'mt-4 inline-block',
            'text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]',
            'hover:underline'
          )}
        >
          프로필로 돌아가기
        </Link>
      </div>
    </main>
  );
}
