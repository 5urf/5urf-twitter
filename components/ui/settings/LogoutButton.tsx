'use client';

import { logOut } from '@/app/(tabs)/settings/actions';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function LogoutButton() {
  const handleLogout = async () => {
    toast.success('로그아웃 되었습니다.');
    await logOut();
  };

  return (
    <button
      onClick={handleLogout}
      className={cn(
        'flex w-full items-center justify-between p-4 text-left transition',
        'text-[var(--error)] hover:bg-[var(--hover-light)]'
      )}
    >
      <span className="text-base">로그아웃</span>
      <LogOut className="size-5" />
    </button>
  );
}
