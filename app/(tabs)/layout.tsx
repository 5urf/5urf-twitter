import TabBar from '@/components/navigation/tabbar/TabBar';
import { getCurrentUsername } from '@/lib/user';
import React from 'react';

export default async function TabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const username = await getCurrentUsername();

  const encodedUsername = encodeURIComponent(username);

  return (
    <div className="pb-20">
      {children}
      <TabBar username={encodedUsername} />
    </div>
  );
}
