export default function SearchLoadingSkeleton() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--text-primary)] border-t-transparent dark:border-[var(--accent-primary)] dark:border-t-transparent" />
      <p className="mt-2 text-[var(--text-secondary)]">검색 중...</p>
    </div>
  );
}
