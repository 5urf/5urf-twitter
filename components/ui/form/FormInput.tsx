import { cn } from '@/lib/utils';
import { Lock, Mail, User } from 'lucide-react';
import React from 'react';

type IconType = 'email' | 'username' | 'password';

interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: IconType;
  containerClassName?: string;
  errorMessages?: string[];
}

const FormInput: React.FC<IFormInputProps> = ({
  icon,
  className,
  containerClassName,
  errorMessages = [],
  ...props
}) => {
  const hasError = errorMessages.length > 0;

  const renderIcon = () => {
    switch (icon) {
      case 'email':
        return <Mail className="size-5 text-blue-600" />;
      case 'username':
        return <User className="size-5 text-blue-600" />;
      case 'password':
        return <Lock className="size-5 text-blue-600" />;
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
            'focus:border-blue-500 focus:outline-none focus:ring-0',
            'transition placeholder:text-gray-400',
            hasError && 'border-red-500 ring-1 ring-red-500',
            className
          )}
          {...props}
        />
      </div>
      {hasError && (
        <div className="px-1">
          {errorMessages.map((error, index) => (
            <small key={index} className="block text-red-500">
              {error}
            </small>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormInput;
