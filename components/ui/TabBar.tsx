'use client';

import { Home, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 mx-auto grid w-full max-w-screen-md grid-cols-2 border-t border-neutral-600 bg-neutral-800 px-5 py-3 *:text-white">
      <Link href="/" className="flex flex-col items-center gap-px">
        {pathname === '/' ? (
          <Home className="size-7 fill-white" />
        ) : (
          <Home className="size-7" />
        )}
        <span>홈</span>
      </Link>

      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === '/profile' ? (
          <User className="size-7 fill-white" />
        ) : (
          <User className="size-7" />
        )}
        <span>프로필</span>
      </Link>
    </div>
  );
}
