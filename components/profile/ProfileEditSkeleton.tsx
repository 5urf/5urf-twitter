import BackButton from '@/components/common/BackButton';
import Skeleton from '@/components/layout/Skeleton';

export default function ProfileEditSkeleton() {
  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <BackButton />
      <Skeleton className="mb-6 h-6 w-40" />
      <div className="retro-container mb-6">
        <Skeleton className="mb-4 h-6 w-32" />
        <div className="space-y-4">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-24" />
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
      <div className="retro-container">
        <Skeleton className="mb-4 h-6 w-36" />
        <div className="space-y-4">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </main>
  );
}
