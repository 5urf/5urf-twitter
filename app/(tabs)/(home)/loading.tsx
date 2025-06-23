import PageHeader from '@/components/layout/PageHeader';
import Skeleton from '@/components/layout/Skeleton';

export default function LoadingHome() {
  return (
    <main className="mx-auto max-w-lg px-4 pb-10 pt-10">
      <PageHeader title="HOME" />
      <div className="retro-container mb-6">
        <div className="min-h-20 w-full border-2 border-outline-primary bg-surface-tertiary p-3" />
        <div className="mt-3 flex justify-end">
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="retro-container p-4">
            <Skeleton className="mb-2 h-5 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
