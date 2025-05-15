import BackButton from '@/components/common/BackButton';
import Skeleton from '@/components/layout/Skeleton';

export default function LoadingTweetDetail() {
  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <BackButton />
      <div className="retro-container overflow-hidden p-0">
        <div className="border-b-2 border-[var(--border-primary)] p-5">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="border-b-2 border-[var(--border-primary)] p-5">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Skeleton className="mt-4 h-4 w-40" />
        </div>
        <div className="p-4">
          <div className="flex items-center">
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="mb-4 h-6 w-32 animate-pulse bg-[var(--border-secondary)]" />
        <div className="retro-container overflow-hidden p-0">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="border-b-2 border-[var(--border-primary)] p-4"
            >
              <Skeleton className="mb-2 h-5 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
          ))}
        </div>
        <div className="retro-container mt-4">
          <div className="h-24 w-full border-2 border-[var(--border-primary)] bg-[var(--bg-tertiary)]" />
          <div className="mt-3 flex justify-end">
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    </main>
  );
}
