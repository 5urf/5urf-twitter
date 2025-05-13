'use client';

import { updatePassword } from '@/app/(tabs)/users/[username]/edit/actions';
import FormButton from '@/components/ui/form/FormButton';
import FormInput from '@/components/ui/form/FormInput';
import { ACCOUNT_VALIDATION } from '@/lib/constants';
import { startTransition, useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

export default function PasswordChangeForm() {
  const [state, action] = useActionState(updatePassword, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state) return;

    if (state.formErrors?.length) {
      toast.error(state.formErrors[0]);
      return;
    }

    if (state.message) {
      toast.success(state.message);
      formRef.current?.reset();
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="retro-container">
      <h2 className="mb-4 text-lg font-medium">비밀번호 변경</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          icon="password"
          type="password"
          name="currentPassword"
          placeholder="현재 비밀번호"
          errorMessages={state.fieldErrors?.currentPassword}
          required
        />
        <FormInput
          icon="password"
          type="password"
          name="newPassword"
          placeholder="새 비밀번호"
          minLength={ACCOUNT_VALIDATION.MIN_LENGTH.PASSWORD}
          errorMessages={state.fieldErrors?.newPassword}
          required
        />
        <FormInput
          icon="password"
          type="password"
          name="confirmPassword"
          placeholder="새 비밀번호 확인"
          minLength={ACCOUNT_VALIDATION.MIN_LENGTH.PASSWORD}
          errorMessages={state.fieldErrors?.confirmPassword}
          required
        />
        <div className="flex justify-end">
          <FormButton
            text="비밀번호 변경"
            loadingText="변경 중..."
            type="submit"
            className="w-auto border-[var(--accent-primary)] bg-[var(--accent-primary)] px-4 py-2 hover:border-[var(--accent-secondary)] hover:bg-[var(--accent-secondary)]"
          />
        </div>
      </form>
    </div>
  );
}
