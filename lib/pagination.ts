export const DEFAULT_PAGE_SIZE = 10;

export function getPaginationParams(
  page: number,
  pageSize: number = DEFAULT_PAGE_SIZE
) {
  const currentPage = page > 0 ? page : 1;
  const skip = (currentPage - 1) * pageSize;

  return {
    skip,
    take: pageSize,
    currentPage,
  };
}

export async function getPageFromSearchParams(
  searchParams: Promise<{ page?: string }>
) {
  const { page: pageParam } = await searchParams;
  return Number(pageParam) || 1;
}
