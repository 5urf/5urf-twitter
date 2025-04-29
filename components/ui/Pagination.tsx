'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  basePath = '/',
  className,
}: IPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const createPageUrl = (pageNum: number) => {
    const baseUrl = basePath.includes('?')
      ? `${basePath}&page=${pageNum}`
      : `${basePath}?page=${pageNum}`;

    return baseUrl;
  };

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div
      className={cn(
        'mt-8 flex items-center justify-center space-x-4',
        className
      )}
    >
      <Link
        href={createPageUrl(currentPage > 1 ? currentPage - 1 : 1)}
        className={cn(
          'rounded-full border p-2 transition',
          isPrevDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
        )}
        aria-disabled={isPrevDisabled}
        tabIndex={isPrevDisabled ? -1 : undefined}
      >
        <ChevronLeft className="size-5" />
      </Link>

      <span className="text-sm font-medium">
        {currentPage} / {totalPages}
      </span>

      <Link
        href={createPageUrl(
          currentPage < totalPages ? currentPage + 1 : totalPages
        )}
        className={cn(
          'rounded-full border p-2 transition',
          isNextDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
        )}
        aria-disabled={isNextDisabled}
        tabIndex={isNextDisabled ? -1 : undefined}
      >
        <ChevronRight className="size-5" />
      </Link>
    </div>
  );
};

export default Pagination;
