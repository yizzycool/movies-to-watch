import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazySearchMoviesQuery } from '@/store/apis/tmdb';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import TmdbImage, { TmdbImageTypes } from '@/components/common/tmdb-image';
import TmdbMovieHoverMask from '../common/tmdb-movie-hover-mask';
import LoadingSkeleton from './loading-skeleton';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

export default function Search() {
  // Data for search results (might increase since infinte scroll)
  const [fetchedData, setFetchedData] = useState(null);

  const router = useRouter();
  const query = router.query?.q || null;

  const [trigger, result, lastPromiseInfo] = useLazySearchMoviesQuery();
  const { data, isFetching } = result;

  // Use this hook to trigger infinite scroll
  const { hit } = useIntersectionObserver({
    startDetect: !_isEmpty(fetchedData),
    targetSelector: '#search-result-spinner',
    threshold: 0.5,
  });

  // Call API when 'query' detected
  useEffect(() => {
    if (!query) return;
    // Clear previous data if query changed
    const { lastArg } = lastPromiseInfo;
    if (query !== lastArg?.query) setFetchedData(null);
    trigger({ query });
  }, [trigger, query]);

  // Call API again when scroll to bottom
  useEffect(() => {
    if (!hit || _isEmpty(data)) return;
    const page = _get(data, 'page', 0);
    const totalPages = _get(data, 'total_pages', 0);
    if (page >= totalPages) return;
    trigger({ query, page: page + 1 });
  }, [hit]);

  // update data
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

  const getMovieId = (result) => _get(result, 'id', null);

  const getPosterPath = (result) => _get(result, 'poster_path', '');

  // Navigate to /movie page
  const onMovieClick = (result) => {
    const url = `/movie?id=${getMovieId(result)}`;
    router.push(url);
  };

  return (
    <div className="container-xl text-center">
      {_isEmpty(fetchedData) ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="fs-3 mt-5">
            Search Results for <span className="text-info">{query}</span>
          </div>
          <div className="row gx-3 gy-3 my-5">
            {fetchedData?.results.map((result, idx) => (
              <div key={idx} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <div
                  className="position-relative ratio rounded overflow-hidden"
                  style={{ '--bs-aspect-ratio': '150%' }}
                >
                  <TmdbImage
                    linkTo={`/movie?id=${getMovieId(result)}`}
                    path={getPosterPath(result)}
                    type={TmdbImageTypes.poster}
                  />
                  <TmdbMovieHoverMask
                    result={result}
                    onClick={() => onMovieClick(result)}
                  />
                </div>
                <div className="fw-bold mt-2">
                  {_get(result, 'original_title')}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div
        id="search-result-spinner"
        className={`spinner-border mb-5 ${!isFetching ? 'opacity-0' : ''}`}
      />
    </div>
  );
}
