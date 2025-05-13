import SearchForm from '@/components/ui/search/SearchForm';
import SearchResults from '@/components/ui/search/SearchResults';
import { getPageFromSearchParams } from '@/lib/pagination';
import { Metadata } from 'next';
import { searchTweets } from './actions';

interface ISearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export const metadata: Metadata = {
  title: '검색',
  description: '사람들의 이야기와 관심사를 검색해보세요.',
  openGraph: {
    title: '검색 | 5urf Twitter',
    description: '사람들의 이야기와 관심사를 검색해보세요.',
  },
};

export default async function SearchPage({ searchParams }: ISearchPageProps) {
  const { q: query = '' } = await searchParams;
  const page = await getPageFromSearchParams(searchParams);

  const hasSearched = query.trim().length > 0;

  const initialResults = hasSearched
    ? await searchTweets(query, page)
    : { tweets: [], totalPages: 1 };

  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <h1 className="mb-6 text-2xl text-[var(--accent-primary)]">SEARCH</h1>
      <SearchForm initialQuery={query} />
      <SearchResults
        hasSearched={hasSearched}
        initialResults={initialResults}
        query={query}
        currentPage={page}
      />
    </main>
  );
}
