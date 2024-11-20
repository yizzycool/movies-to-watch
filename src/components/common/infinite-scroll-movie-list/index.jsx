import { useEffect } from 'react';
import { useRouter } from 'next/compat/router';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import TmdbImage, { TmdbImageTypes } from '@/components/common/tmdb-image';
import TmdbMovieHoverMask from '@/components/common/tmdb-movie-hover-mask';
import LoadingSkeleton from './loading-skeleton';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

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
      {_isEmpty(fetchedData) ? (
        <LoadingSkeleton />
      ) : (
        <div className={`row gx-3 gy-3 my-5 ${isEmpty ? 'd-none' : ''}`}>
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
      )}
      <div
        id="result-spinner"
        className={`spinner-border mb-5 ${!isFetching ? 'opacity-0' : ''} ${isEmpty ? 'd-none' : ''}`}
      />
    </>
  );
}
