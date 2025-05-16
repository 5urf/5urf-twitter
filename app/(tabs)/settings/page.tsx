import { getTheme } from '@/app/actions/theme';
import PageHeader from '@/components/layout/PageHeader';
import DarkModeToggle from '@/components/settings/DarkModeToggle';
import LogoutButton from '@/components/settings/LogoutButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '설정',
  description: '계정 설정을 관리하세요.',
  openGraph: {
    title: '설정 | 5urf Twitter',
    description: '계정 설정을 관리하세요.',
  },
};

export default async function SettingsPage() {
  const theme = await getTheme();
  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <PageHeader title="SETTINGS" />
      <div className="space-y-4">
        <div className="retro-container">
          <DarkModeToggle initialTheme={theme} />
        </div>
        <div className="retro-container">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
