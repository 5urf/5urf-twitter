'use client';

import { Home, Search, Settings, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import TabItem from './TabItem';

export default function TabBar({ username }: { username?: string }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto border-t-2 border-outline-primary bg-surface-secondary">
      <nav className="mx-auto grid max-w-screen-md grid-cols-4">
        <TabItem
          href="/"
          label="홈"
          isActive={isActive('/')}
          icon={<Home className="size-6" />}
        />
        <TabItem
          href="/search"
          label="검색"
          isActive={isActive('/search')}
          icon={<Search className="size-6" />}
        />
        <TabItem
          href={`/users/${username}`}
          label="프로필"
          isActive={isActive('/users')}
          icon={<User className="size-6" />}
        />
        <TabItem
          href="/settings"
          label="설정"
          isActive={isActive('/settings')}
          icon={<Settings className="size-6" />}
        />
      </nav>
    </div>
  );
}
