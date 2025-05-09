'use client';

import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IBackButtonProps {
  text?: string;
  className?: string;
  containerClassName?: string;
}

export default function BackButton({
  text = 'BACK',
  className,
  containerClassName,
}: IBackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div className={cn('mb-4', containerClassName)}>
      <button
        onClick={handleClick}
        className={cn(
          'inline-flex items-center text-blue-600 transition-colors hover:text-blue-800',
          className
        )}
      >
        <ArrowLeft className="mr-1 size-5" />
        <span className="font-pixel">{text}</span>
      </button>
    </div>
  );
}
