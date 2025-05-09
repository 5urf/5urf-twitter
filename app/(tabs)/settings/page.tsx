import LogoutButton from '@/components/ui/settings/LogoutButton';

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
