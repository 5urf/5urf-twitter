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
        'retro-button w-full border-blue-600 bg-blue-600 py-3 text-white',
        'hover:border-blue-700 hover:bg-blue-700',
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
