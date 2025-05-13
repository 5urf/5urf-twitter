'use client';

import { updateProfile } from '@/app/(tabs)/users/[username]/edit/actions';
import FormButton from '@/components/ui/form/FormButton';
import FormInput from '@/components/ui/form/FormInput';
import { ACCOUNT_VALIDATION } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface IUserProfile {
  username: string;
  email: string;
  bio: string | null;
}

interface IProfileInfoFormProps {
  profile: IUserProfile;
  currentUsername: string;
  onProfileUpdateAction: (data: Partial<IUserProfile>) => void;
}

export default function ProfileInfoForm({
  profile,
  currentUsername,
  onProfileUpdateAction,
}: IProfileInfoFormProps) {
  const [state, action] = useActionState(updateProfile, {});
  const router = useRouter();
  const formDataRef = useRef<IUserProfile | null>(null);

  useEffect(() => {
    if (!state) return;

    if (state.formErrors?.length) {
      toast.error(state.formErrors[0]);
      return;
    }

    if (state.message) {
      toast.success(state.message);

      if (
        formDataRef.current &&
        formDataRef.current.username !== currentUsername
      ) {
        router.push(
          `/users/${encodeURIComponent(formDataRef.current.username)}/edit`
        );
      }
    }
  }, [state, router, currentUsername]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newUsername = formData.get('username')?.toString() || '';
    const newEmail = formData.get('email')?.toString() || '';
    const newBio = formData.get('bio')?.toString() || '';

    formDataRef.current = {
      username: newUsername,
      email: newEmail,
      bio: newBio,
    };

    startTransition(() => {
      onProfileUpdateAction({
        username: newUsername,
        email: newEmail,
        bio: newBio,
      });

      action(formData);
    });
  };

  return (
    <div className="retro-container mb-6">
      <h2 className="mb-4 text-lg font-medium">기본 정보</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          icon="username"
          type="text"
          name="username"
          placeholder="사용자 이름"
          defaultValue={profile.username}
          minLength={ACCOUNT_VALIDATION.MIN_LENGTH.USERNAME}
          errorMessages={state.fieldErrors?.username}
          required
        />
        <FormInput
          icon="email"
          type="email"
          name="email"
          placeholder="이메일"
          defaultValue={profile.email}
          errorMessages={state.fieldErrors?.email}
          required
        />
        <div className="space-y-1">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            자기소개
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="retro-input w-full p-3 focus:border-[var(--accent-primary)]"
            placeholder="자기소개를 입력해주세요."
            defaultValue={profile.bio || ''}
          />
        </div>
        <div className="flex justify-end">
          <FormButton
            text="정보 변경"
            loadingText="변경 중..."
            type="submit"
            className="w-auto border-[var(--accent-primary)] bg-[var(--accent-primary)] px-4 py-2 hover:border-[var(--accent-secondary)] hover:bg-[var(--accent-secondary)]"
          />
        </div>
      </form>
    </div>
  );
}
