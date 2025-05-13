'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useFormStatus } from 'react-dom';

interface IFormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loadingText?: string;
}

export default function FormButton({
  text,
  loadingText = 'Loading...',
  className,
  disabled,
  ...props
}: IFormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={disabled || pending}
      className={cn(
        'retro-button w-full py-3',
        'border-[var(--accent-primary)] bg-[var(--accent-primary)]',
        'text-white dark:text-black',
        'hover:border-[var(--accent-secondary)] hover:bg-[var(--accent-secondary)]',
        'disabled:cursor-not-allowed disabled:opacity-70',
        className
      )}
      {...props}
    >
      {pending ? (
        <span className="flex items-center justify-center">
          <Loader2 className="mr-2 size-4 animate-spin" />
          {loadingText}
        </span>
      ) : (
        text
      )}
    </button>
  );
}
