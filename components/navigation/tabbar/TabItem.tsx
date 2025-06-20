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
        'transition-colors hover:bg-interaction-primary',
        isActive && 'bg-interaction-primary'
      )}
    >
      <div
        className={cn(
          'mb-1',
          isActive ? 'text-brand-primary' : 'text-content-secondary'
        )}
      >
        {icon}
      </div>
      <span
        className={cn(
          'font-pixel text-xs',
          isActive ? 'text-brand-primary' : 'text-content-secondary'
        )}
      >
        {label}
      </span>
    </Link>
  );
}
