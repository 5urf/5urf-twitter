export default function SearchLoadingSkeleton() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
      <p className="mt-2 text-content-secondary">검색 중...</p>
    </div>
  );
}
