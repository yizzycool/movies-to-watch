import { useEffect } from 'react';
import { useRouter } from 'next/compat/router';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { TmdbImageTypes } from '@/components/common/tmdb-image';
import LoadingSkeleton from './loading-skeleton';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import TmdbMovieCard from '../tmdb-movie-card';

export default function InfiniteScrollMovieList({
  isEmpty,
  fetchedData,
  isFetching,
  onNext = () => {},
}) {
  const router = useRouter();

  // Use this hook to trigger infinite scroll
  const { hit } = useIntersectionObserver({
    startDetect: !_isEmpty(fetchedData),
    targetSelector: '#result-spinner',
    threshold: 0.5,
  });

  // Call API to query next-page data when scroll to bottom
  useEffect(() => {
    if (!hit) return;
    onNext();
  }, [hit]);

  const getMovieId = (result) => _get(result, 'id', null);

  const getPosterPath = (result) => _get(result, 'poster_path', '');

  // Navigate to /movie page
  const onMovieClick = (result) => {
    const url = `/movie?id=${getMovieId(result)}`;
    router.push(url);
  };

  return (
    <>
      {_isEmpty(fetchedData) && !isEmpty ? (
        <LoadingSkeleton />
      ) : (
        <div className={`row gx-3 gy-3 my-5 ${isEmpty ? 'd-none' : ''}`}>
          {fetchedData?.results.map((result, idx) => (
            <div key={idx} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <TmdbMovieCard
                result={result}
                linkTo={`/movie?id=${getMovieId(result)}`}
                path={getPosterPath(result)}
                type={TmdbImageTypes.poster}
                onClick={() => onMovieClick(result)}
              />
              <div className="fw-bold mt-2">
                {_get(result, 'original_title')}
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        id="result-spinner"
        className={`spinner-border mb-5 ${!isFetching ? 'opacity-0' : ''} ${isEmpty ? 'd-none' : ''}`}
      />
    </>
  );
}
