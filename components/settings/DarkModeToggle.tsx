'use client';

import { setTheme } from '@/app/actions/theme';
import { cn } from '@/lib/utils';
import { Monitor, Moon } from 'lucide-react';
import { useState, useTransition } from 'react';

interface IDarkModeToggleProps {
  initialTheme: string;
}

export default function DarkModeToggle({ initialTheme }: IDarkModeToggleProps) {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    setCurrentTheme(newTheme);

    startTransition(async () => {
      await setTheme(newTheme);
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        'flex w-full items-center justify-between p-4 transition',
        'hover:bg-interaction-primary'
      )}
    >
      <span className="flex items-center gap-3">
        {currentTheme === 'dark' ? (
          <Moon className="size-5 text-brand-primary" />
        ) : (
          <Monitor className="size-5" />
        )}
        <span>{currentTheme === 'dark' ? '다크 모드' : '라이트 모드'}</span>
      </span>
      <div className="relative">
        <div className="retro-container h-6 w-12 p-0">
          <div
            className={cn(
              'absolute top-1 size-4 bg-brand-primary transition-transform',
              currentTheme === 'dark' ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </div>
      </div>
    </button>
  );
}
