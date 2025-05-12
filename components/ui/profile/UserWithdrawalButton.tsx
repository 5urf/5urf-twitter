'use client';

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
        className="flex w-full items-center justify-between border-b-0 border-l-0 border-r-0 border-t-0 p-4 text-left text-red-500 transition hover:bg-red-50"
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
