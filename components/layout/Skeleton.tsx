import { cn } from '@/lib/utils';

interface ISkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: ISkeletonProps) {
  return (
    <div className={cn('animate-pulse bg-outline-secondary', className)} />
  );
}
