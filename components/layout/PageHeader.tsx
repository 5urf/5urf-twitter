import { cn } from '@/lib/utils';

interface IPageHeaderProps {
  title: string;
  className?: string;
}

export default function PageHeader({ title, className }: IPageHeaderProps) {
  return (
    <h1
      className={cn(
        'mb-6 font-pixel text-2xl text-[var(--accent-primary)]',
        className
      )}
    >
      {title}
    </h1>
  );
}
