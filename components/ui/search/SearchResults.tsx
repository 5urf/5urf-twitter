'use client';

import { searchTweets } from '@/app/(tabs)/search/actions';
import Pagination from '@/components/ui/Pagination';
import TweetList from '@/components/ui/TweetList';
import { cn } from '@/lib/utils';
import { Tweet } from '@prisma/client';
import { useEffect, useState } from 'react';

type SearchResultTweet = Tweet & {
  user: {
    username: string;
  };
  _count: {
    likes: number;
    responses: number;
  };
};

interface ISearchResultsProps {
  hasSearched: boolean;
  initialResults: {
    tweets: SearchResultTweet[];
    totalPages: number;
  };
  query: string;
  currentPage: number;
}

export default function SearchResults({
  hasSearched,
  initialResults,
  query,
  currentPage,
}: ISearchResultsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(initialResults);

  useEffect(() => {
    if (!hasSearched) return;

    const fetchResults = async () => {
      setIsLoading(true);

      try {
        const data = await searchTweets(query, currentPage);
        setResults(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, currentPage, hasSearched]);

  if (!hasSearched) {
    return (
      <div className="retro-container mt-8 p-6 text-center">
        <p className="text-[var(--text-secondary)]">검색어를 입력하세요.</p>
        <p className="mt-2 text-sm text-[var(--text-tertiary)]">
          트윗 내용과 사용자 이름으로 검색할 수 있습니다.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center">
        <div
          className={cn(
            'h-10 w-10 animate-spin rounded-full border-4 border-t-transparent',
            'border-[var(--text-primary)] dark:border-[var(--accent-primary)]'
          )}
        />
        <p className="mt-2">검색 중...</p>
      </div>
    );
  }

  if (results.tweets.length === 0) {
    return (
      <div className="retro-container mt-8 p-6 text-center">
        <p className="text-gray-600">검색 결과가 없습니다.</p>
        <p className="mt-2 text-sm text-gray-500">
          다른 검색어를 입력해 보세요.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6">
        <TweetList tweets={results.tweets} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={results.totalPages}
        basePath={`/search?q=${encodeURIComponent(query)}`}
      />
    </>
  );
}
