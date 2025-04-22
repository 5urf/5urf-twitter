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

const FormButton: React.FC<IFormButtonProps> = ({
  text,
  loadingText = 'Loading...',
  className,
  disabled,
  ...props
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={disabled || pending}
      className={cn(
        'w-full rounded-full bg-gray-100 px-4 py-3 font-semibold text-gray-800',
        'transition-colors duration-200 hover:bg-gray-200',
        'focus:outline-none',
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
};

export default FormButton;
