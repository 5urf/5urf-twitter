'use client';

import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IBackButtonProps {
  text?: string;
  className?: string;
  containerClassName?: string;
  fallbackPath?: string;
}

export default function BackButton({
  text = 'BACK',
  className,
  containerClassName,
  fallbackPath,
}: IBackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (fallbackPath) {
      router.push(fallbackPath);
      return;
    }

    router.back();
  };

  return (
    <div className={cn('mb-4', containerClassName)}>
      <button
        onClick={handleClick}
        className={cn(
          'inline-flex items-center transition-colors',
          'text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]',
          className
        )}
      >
        <ArrowLeft className="mr-1 size-5" />
        <span className="font-pixel">{text}</span>
      </button>
    </div>
  );
}
