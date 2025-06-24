'use client';

import { searchTweets } from '@/app/(tabs)/search/actions';
import { SearchResult } from '@/types/database';
import { useEffect, useState } from 'react';
import Pagination from '../common/Pagination';
import EmptyState from '../layout/EmptyState';
import TweetList from '../tweet/TweetList';
import SearchLoadingSkeleton from './SearchLoadingSkeleton';

interface ISearchResultsProps {
  hasSearched: boolean;
  initialResults: SearchResult;
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
      <EmptyState
        title="검색어를 입력하세요."
        description="트윗 내용과 사용자 이름으로 검색할 수 있습니다."
        containerClassName="mt-8"
      />
    );
  }

  if (isLoading) {
    return <SearchLoadingSkeleton />;
  }

  if (results.tweets.length === 0) {
    return (
      <EmptyState
        title="검색 결과가 없습니다."
        description="다른 검색어를 입력해 보세요."
        containerClassName="mt-8"
      />
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
