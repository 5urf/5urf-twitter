'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IModalWrapperProps {
  isOpen: boolean;
  onCloseAction: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function ModalWrapper({
  isOpen,
  onCloseAction,
  children,
  className,
}: IModalWrapperProps) {
  // 클라이언트 사이드 렌더링을 위한 마운트 상태
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCloseAction();
    }
  };

  const portalElement = document.getElementById('portal-root') || document.body;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
      role="dialog"
    >
      <div className={cn('retro-container mx-4 w-full max-w-md', className)}>
        {children}
      </div>
    </div>,
    portalElement
  );
}
