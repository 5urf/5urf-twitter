import TabBar from '@/components/ui/TabBar';
import React from 'react';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-20">
      {children}
      <TabBar />
    </div>
  );
}
