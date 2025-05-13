'use client';

import { cn } from '@/lib/utils';
import { UserX } from 'lucide-react';
import { useState } from 'react';
import WithdrawalConfirmModal from './WithdrawalConfirmModal';

export default function UserWithdrawalButton() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModalAction = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={cn(
          'flex w-full items-center justify-between p-4 text-left transition',
          'text-[var(--error)] hover:bg-[var(--error-light)]'
        )}
      >
        <span className="text-base">회원 탈퇴</span>
        <UserX className="size-5" />
      </button>
      {showModal && (
        <WithdrawalConfirmModal onCloseAction={handleCloseModalAction} />
      )}
    </>
  );
}
