import LogoutButton from '@/components/ui/settings/LogoutButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '설정',
  description: '계정 설정을 관리하세요.',
  openGraph: {
    title: '설정 | 5urf Twitter',
    description: '계정 설정을 관리하세요.',
  },
};

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <h1 className="mb-6 text-2xl text-blue-600">SETTINGS</h1>
      <div className="space-y-4">
        <div className="retro-container">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
