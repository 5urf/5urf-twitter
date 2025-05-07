import SearchForm from '@/components/ui/search/SearchForm';
import SearchResults from '@/components/ui/search/SearchResults';
import { searchTweets } from './actions';

interface ISearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: ISearchPageProps) {
  const { q: query = '', page: pageParam } = await searchParams;

  const page = Number(pageParam) || 1;

  const hasSearched = query.trim().length > 0;

  const initialResults = hasSearched
    ? await searchTweets(query, page)
    : { tweets: [], totalPages: 1 };

  return (
    <main className="mx-auto max-w-lg px-4 pb-20 pt-5">
      <h1 className="mb-6 text-2xl text-blue-600">SEARCH</h1>
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
