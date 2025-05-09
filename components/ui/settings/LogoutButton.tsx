'use client';

import { logOut } from '@/app/(tabs)/settings/actions';
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
      className="flex w-full items-center justify-between border-b-0 border-l-0 border-r-0 border-t-0 p-4 text-left text-red-500 transition hover:bg-gray-50"
    >
      <span className="text-base">로그아웃</span>
      <LogOut className="size-5" />
    </button>
  );
}
