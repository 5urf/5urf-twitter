import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ITabItemProps {
  href: string;
  label: string;
  isActive: boolean;
  icon: React.ReactNode;
}

export default function TabItem({
  href,
  label,
  isActive,
  icon,
}: ITabItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center px-1 py-3',
        'transition-colors hover:bg-[var(--hover-light)] dark:hover:bg-[var(--hover-bg)]',
        isActive && 'bg-[var(--hover-light)] dark:bg-[var(--hover-bg)]'
      )}
    >
      <div
        className={cn(
          'mb-1',
          isActive
            ? 'text-[var(--accent-primary)]'
            : 'text-[var(--text-secondary)]'
        )}
      >
        {icon}
      </div>
      <span
        className={cn(
          'font-pixel text-xs',
          isActive
            ? 'text-[var(--accent-primary)]'
            : 'text-[var(--text-secondary)]'
        )}
      >
        {label}
      </span>
    </Link>
  );
}
