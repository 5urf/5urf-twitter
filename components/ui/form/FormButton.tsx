'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useFormStatus } from 'react-dom';

interface IFormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loadingText?: string;
  errorMessage?: string;
  successMessage?: string;
}

const FormButton: React.FC<IFormButtonProps> = ({
  text,
  loadingText = 'Loading...',
  errorMessage,
  successMessage,
  className,
  disabled,
  ...props
}) => {
  const { pending } = useFormStatus();

  return (
    <div className="space-y-2">
      {errorMessage && (
        <small className="p-1 text-sm text-red-500">{errorMessage}</small>
      )}
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
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText}
          </span>
        ) : (
          text
        )}
      </button>
      {successMessage && (
        <div className="mt-2 px-1 text-center text-sm text-green-500">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default FormButton;
