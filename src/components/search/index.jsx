import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazySearchMoviesQuery } from '@/store/apis/tmdb';
import InfiniteScrollMovieList from '../common/infinite-scroll-movie-list';
import NoResults from './no-results';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

export default function Search() {
  // Data for search results (might increase since infinte scroll)
  const [fetchedData, setFetchedData] = useState(null);

  const router = useRouter();
  const query = router.query?.q || null;

  const [trigger, result, lastPromiseInfo] = useLazySearchMoviesQuery();
  const { data, isFetching } = result;

  // Call API when 'query' detected
  useEffect(() => {
    if (!query) return;
    // Clear previous data if query changed
    const { lastArg } = lastPromiseInfo;
    if (query !== lastArg?.query) setFetchedData(null);
    trigger({ query });
  }, [trigger, query]);

  // Update data
  useEffect(() => {
    if (_isEmpty(data)) return;
    const { page, total_pages, total_results, results } = data;
    setFetchedData((prev) => ({
      page: page || prev?.page || 0,
      total_pages: total_pages || prev?.total_pages || 0,
      total_results: total_results || prev?.total_results || 0,
      results: [..._get(prev, 'results', []), ...results],
    }));
  }, [data]);

  // Call API again when scroll to bottom
  const onNext = () => {
    if (isFetching) return;
    const page = _get(data, 'page', 0);
    const totalPages = _get(data, 'total_pages', 0);
    if (page >= totalPages) return;
    trigger({ query, page: page + 1 });
  };

  // Show empty if no results found
  const isEmpty =
    router.isReady && router.query.q && _isEmpty(_get(fetchedData, 'results'));

  return (
    <div
      className="container-xl text-center pt-5"
      style={{ minHeight: '100%' }}
    >
      <div className="fs-3">
        Search Results for <span className="text-info">{query}</span>
      </div>
      <InfiniteScrollMovieList
        isEmpty={isEmpty}
        fetchedData={fetchedData}
        isFetching={isFetching}
        onNext={onNext}
      />
      <NoResults isEmpty={isEmpty} />
    </div>
  );
}
