import { cn } from '@/lib/utils';

interface IEmptyStateProps {
  title: string;
  description?: string;
  className?: string;
  containerClassName?: string;
}

export default function EmptyState({
  title,
  description,
  className,
  containerClassName,
}: IEmptyStateProps) {
  return (
    <div className={cn('retro-container p-6 text-center', containerClassName)}>
      <p className={cn('text-content-secondary', className)}>{title}</p>
      {description && (
        <p className="mt-2 text-sm text-content-secondary">{description}</p>
      )}
    </div>
  );
}
