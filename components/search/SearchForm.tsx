'use client';

import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

interface ISearchFormProps {
  initialQuery?: string;
}

export default function SearchForm({ initialQuery = '' }: ISearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const disabled = !query.trim();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="retro-container p-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요."
          className="retro-input w-full py-3 pl-3 pr-12 focus:border-brand-primary"
        />
        <button
          type="submit"
          className={cn(
            'absolute right-0 top-0 h-full px-4 transition-colors',
            disabled
              ? 'cursor-not-allowed text-content-tertiary'
              : 'cursor-pointer text-brand-primary'
          )}
          disabled={disabled}
        >
          <Search className="size-5" />
        </button>
      </div>
    </form>
  );
}
