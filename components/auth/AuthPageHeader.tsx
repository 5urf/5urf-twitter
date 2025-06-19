import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface IAuthPageHeaderProps {
  icon: LucideIcon;
  title: string;
  className?: string;
}

export default function AuthPageHeader({
  icon: Icon,
  title,
  className,
}: IAuthPageHeaderProps) {
  return (
    <figure
      className={cn(
        'mb-8 flex flex-col items-center justify-center gap-2',
        className
      )}
    >
      <Icon className="size-14 text-[var(--accent-primary)] dark:text-[var(--accent-primary)]" />
      <h2 className="text-xl text-[var(--accent-primary)] dark:text-[var(--accent-primary)]">
        {title}
      </h2>
    </figure>
  );
}
