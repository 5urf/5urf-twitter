import { cn } from '@/lib/utils';
import { Lock, Mail, User } from 'lucide-react';
import React from 'react';

type IconType = 'email' | 'username' | 'password';

interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: IconType;
  containerClassName?: string;
  errorMessages?: string[];
}

export default function FormInput({
  icon,
  className,
  containerClassName,
  errorMessages = [],
  ...props
}: IFormInputProps) {
  const hasError = errorMessages.length > 0;

  const renderIcon = () => {
    const iconClass = 'size-5 text-[var(--accent-primary)]';
    switch (icon) {
      case 'email':
        return <Mail className={iconClass} />;
      case 'username':
        return <User className={iconClass} />;
      case 'password':
        return <Lock className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn('space-y-1', containerClassName)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          {renderIcon()}
        </div>
        <input
          className={cn(
            'retro-input w-full py-3 pl-12 pr-4',
            'focus:border-[var(--accent-primary)] focus:outline-none focus:ring-0',
            'transition placeholder:text-[var(--text-secondary)]',
            hasError && 'border-[var(--error)] ring-1 ring-[var(--error)]',
            className
          )}
          {...props}
        />
      </div>
      {hasError && (
        <div className="px-1">
          {errorMessages.map((error, index) => (
            <small key={index} className="block text-[var(--error)]">
              {error}
            </small>
          ))}
        </div>
      )}
    </div>
  );
}
