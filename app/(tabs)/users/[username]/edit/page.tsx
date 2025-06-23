'use client';

import BackButton from '@/components/common/BackButton';
import PasswordChangeForm from '@/components/profile/PasswordChangeForm';
import ProfileEditError from '@/components/profile/ProfileEditError';
import ProfileEditSkeleton from '@/components/profile/ProfileEditSkeleton';
import ProfileInfoForm from '@/components/profile/ProfileInfoForm';
import UserWithdrawalButton from '@/components/profile/UserWithdrawalButton';
import { cn } from '@/lib/utils';
import { User } from '@prisma/client';
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
    return <ProfileEditSkeleton />;
  }

  if (!profile) {
    return <ProfileEditError username={username} />;
  }

  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <BackButton
        fallbackPath={`/users/${encodeURIComponent(decodedUsername)}`}
      />
      <h1 className={cn('mb-6 text-xl font-medium text-brand-primary')}>
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
