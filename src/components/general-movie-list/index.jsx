import { useEffect, useState } from 'react';
import InfiniteScrollMovieList from '@/components/common/infinite-scroll-movie-list';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

// Component that show movies with different trends (e.g. Popular, Top Rated, etc.)
export default function GeneralMovieList({ title, useLazyGetQueryFunc }) {
  // Data for search results (might increase since infinte scroll)
  const [fetchedData, setFetchedData] = useState(null);

  const [trigger, result] = useLazyGetQueryFunc();
  const { data, isFetching } = result;

  // Call API when mounted
  useEffect(() => {
    trigger({});
  }, []);

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
    trigger({ page: page + 1 });
  };

  return (
    <div className="container-xl text-center">
      <div className="fs-3 mt-5">{title}</div>
      <InfiniteScrollMovieList
        fetchedData={fetchedData}
        isFetching={isFetching}
        onNext={onNext}
      />
    </div>
  );
}
