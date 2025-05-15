import BackButton from '@/components/common/BackButton';

export default function LoadingTweetDetail() {
  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <BackButton />
      <div className="retro-container overflow-hidden p-0">
        <div className="border-b-2 border-[var(--border-primary)] p-5">
          <div className="h-5 w-32 animate-pulse bg-[var(--border-secondary)]" />
        </div>
        <div className="border-b-2 border-[var(--border-primary)] p-5">
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse bg-[var(--border-secondary)]" />
            <div className="h-4 w-full animate-pulse bg-[var(--border-secondary)]" />
            <div className="h-4 w-3/4 animate-pulse bg-[var(--border-secondary)]" />
          </div>
          <div className="mt-4 h-4 w-40 animate-pulse bg-[var(--border-secondary)]" />
        </div>
        <div className="p-4">
          <div className="flex items-center">
            <div className="h-8 w-16 animate-pulse bg-[var(--border-secondary)]" />
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
              <div className="mb-2 h-5 w-24 animate-pulse bg-[var(--border-secondary)]" />
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse bg-[var(--border-secondary)]" />
                <div className="h-4 w-3/4 animate-pulse bg-[var(--border-secondary)]" />
              </div>
              <div className="mt-2 h-4 w-32 animate-pulse bg-[var(--border-secondary)]" />
            </div>
          ))}
        </div>
        <div className="retro-container mt-4">
          <div className="h-24 w-full border-2 border-[var(--border-primary)] bg-[var(--bg-tertiary)]" />
          <div className="mt-3 flex justify-end">
            <div className="h-10 w-24 animate-pulse bg-[var(--border-secondary)]" />
          </div>
        </div>
      </div>
    </main>
  );
}
