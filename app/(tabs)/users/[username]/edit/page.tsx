'use client';

import BackButton from '@/components/ui/BackButton';
import PasswordChangeForm from '@/components/ui/profile/PasswordChangeForm';
import ProfileInfoForm from '@/components/ui/profile/ProfileInfoForm';
import UserWithdrawalButton from '@/components/ui/profile/UserWithdrawalButton';
import { cn } from '@/lib/utils';
import { User } from '@prisma/client';
import Link from 'next/link';
import { use, useEffect, useOptimistic, useState } from 'react';
import { toast } from 'sonner';

type UserProfile = Pick<User, 'id' | 'username' | 'email' | 'bio'>;
interface IProfileEditPageProps {
  params: Promise<{ username: string }>;
}

export default function ProfileEditPage({ params }: IProfileEditPageProps) {
  const resolvedParams = use(params);
  const { username } = resolvedParams;
  const decodedUsername = decodeURIComponent(username);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [optimisticProfile, updateOptimisticProfile] = useOptimistic<
    UserProfile | null,
    Partial<UserProfile>
  >(profile, (state, newData) => {
    if (!state) return state;
    return {
      ...state,
      ...newData,
    };
  });

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch(
          `/api/users/${encodeURIComponent(decodedUsername)}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('프로필 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, [decodedUsername]);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
        <BackButton />
        <div className="mb-6 h-6 w-40 animate-pulse bg-blue-200" />
        <div className="retro-container mb-6">
          <div className="mb-4 h-6 w-32 animate-pulse bg-gray-200" />
          <div className="space-y-4">
            <div className="h-12 animate-pulse bg-gray-200" />
            <div className="h-12 animate-pulse bg-gray-200" />
            <div className="h-24 animate-pulse bg-gray-200" />
            <div className="flex justify-end">
              <div className="h-10 w-32 animate-pulse bg-blue-200" />
            </div>
          </div>
        </div>
        <div className="retro-container">
          <div className="mb-4 h-6 w-36 animate-pulse bg-gray-200" />
          <div className="space-y-4">
            <div className="h-12 animate-pulse bg-gray-200" />
            <div className="h-12 animate-pulse bg-gray-200" />
            <div className="h-12 animate-pulse bg-gray-200" />
            <div className="flex justify-end">
              <div className="h-10 w-32 animate-pulse bg-blue-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
        <div className="retro-container p-6 text-center">
          <p className="text-red-600">프로필 정보를 불러오는데 실패했습니다.</p>
          <Link
            href={`/users/${username}`}
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            프로필로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <BackButton
        fallbackPath={`/users/${encodeURIComponent(decodedUsername)}`}
      />
      <h1
        className={cn(
          'mb-6 text-xl font-medium',
          'text-[var(--text-primary)] dark:text-[var(--accent-primary)]'
        )}
      >
        프로필 편집
      </h1>
      {optimisticProfile && (
        <>
          <ProfileInfoForm
            profile={optimisticProfile}
            currentUsername={decodedUsername}
            onProfileUpdateAction={updateOptimisticProfile}
          />
          <PasswordChangeForm />
          <div className="retro-container mt-6">
            <UserWithdrawalButton />
          </div>
        </>
      )}
    </main>
  );
}
