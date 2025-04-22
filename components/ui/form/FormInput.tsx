import { cn } from '@/lib/utils';
import { Lock, Mail, User } from 'lucide-react';
import React from 'react';

type IconType = 'email' | 'username' | 'password';

interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: IconType;
  containerClassName?: string;
}

const FormInput: React.FC<IFormInputProps> = ({
  icon,
  className,
  containerClassName,
  ...props
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'email':
        return <Mail className="h-5 w-5" />;
      case 'username':
        return <User className="h-5 w-5" />;
      case 'password':
        return <Lock className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn('relative', containerClassName)}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-4">
        {renderIcon()}
      </div>
      <input
        className={cn(
          'w-full rounded-full border border-neutral-200 py-3 pl-12 pr-4',
          'focus:border-transparent focus:outline-none focus:ring-4 focus:ring-neutral-300',
          'transition',
          'placeholder:text-neutral-300',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default FormInput;
