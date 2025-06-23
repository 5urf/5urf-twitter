'use client';

import { withdrawUser } from '@/app/(tabs)/users/[username]/edit/actions';
import FormButton from '@/components/form/FormButton';
import FormInput from '@/components/form/FormInput';
import ModalWrapper from '@/components/modal/ModalWrapper';
import { ACCOUNT_VALIDATION } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect } from 'react';
import { toast } from 'sonner';

interface IWithdrawalConfirmModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function WithdrawalConfirmModal({
  isOpen,
  onCloseAction,
}: IWithdrawalConfirmModalProps) {
  const [state, action] = useActionState(withdrawUser, {});
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  };

  useEffect(() => {
    if (state.formErrors?.length) {
      toast.error(state.formErrors[0]);
    }

    if (state.message) {
      toast.success(state.message);
      router.push('/log-in');
    }
  }, [state, router]);

  return (
    <ModalWrapper isOpen={isOpen} onCloseAction={onCloseAction}>
      <h2 className="mb-4 text-lg font-medium text-status-error">회원 탈퇴</h2>
      <div className="mb-6">
        <p className="mb-2 text-content-primary">정말로 탈퇴하시겠습니까?</p>
        <p className="text-sm text-content-secondary">
          • 모든 트윗, 좋아요, 댓글이 삭제됩니다.
        </p>
        <p className="text-sm text-content-secondary">
          • 삭제된 데이터는 복구할 수 없습니다.
        </p>
        <p className="text-sm text-content-secondary">
          • 동일한 이메일로 재가입이 가능합니다.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          icon="password"
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          minLength={ACCOUNT_VALIDATION.MIN_LENGTH.PASSWORD}
          errorMessages={state.fieldErrors?.password}
          required
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCloseAction}
            className="retro-button border-outline-primary bg-surface-secondary px-4 py-2 hover:bg-interaction-secondary"
          >
            취소
          </button>
          <FormButton
            text="탈퇴하기"
            loadingText="처리 중..."
            type="submit"
            className="w-auto border-status-error bg-status-error px-4 py-2 hover:border-status-error hover:bg-status-error hover:opacity-90"
          />
        </div>
      </form>
    </ModalWrapper>
  );
}
