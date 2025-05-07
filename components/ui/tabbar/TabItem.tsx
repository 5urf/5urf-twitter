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
        'transition-colors hover:bg-gray-100',
        isActive && 'bg-gray-100'
      )}
    >
      <div className={cn('mb-1', isActive ? 'text-blue-600' : 'text-gray-700')}>
        {icon}
      </div>
      <span
        className={cn(
          'font-pixel text-xs',
          isActive ? 'text-blue-600' : 'text-gray-700'
        )}
      >
        {label}
      </span>
    </Link>
  );
}
