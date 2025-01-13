import { useMemo } from 'react';
import { useRouter } from 'next/compat/router';
import { useSelector } from 'react-redux';
import { TmdbImageTypes } from '@/components/common/tmdb-image';
import TmdbMovieCard from '@/components/common/tmdb-movie-card';
import LoadingSkeleton from './loading-skeleton';
import LoadingSkeletonForMovieCard from './loading-skeleton/movie-card';
import AiGenBlock from './ai-gen-block';
import NoWatchlist from './no-watchlist';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _size from 'lodash/size';
import _range from 'lodash/range';

export default function YourWatchlist({
  fetchedData,
  userSelection,
  setUserSelection,
  startAiRecommendation,
}) {
  const router = useRouter();

  const watchlist = useSelector((state) => state.user.watchlist);

  const noWatchlist = _isEmpty(watchlist);

  // Counts of unqueried movie id
  const skeletonSize = useMemo(() => {
    return _size(watchlist) - _size(fetchedData);
  }, [fetchedData, watchlist]);

  const getMovieId = (result) => _get(result, 'id', null);

  const getPosterPath = (result) => _get(result, 'poster_path', '');

  // Navigate to /movie page
  const onMovieClick = (result) => {
    const url = `/movie?id=${getMovieId(result)}`;
    router.push(url);
  };

  return (
    <div className="container-xl text-center pt-5">
      {!noWatchlist && _isEmpty(fetchedData) ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="fs-3">Your Watch List</div>
          {noWatchlist ? (
            <NoWatchlist />
          ) : (
            <div className="row gx-3 gy-3 my-5">
              {fetchedData.map((result, idx) => (
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
              {_range(skeletonSize).map((idx) => (
                <LoadingSkeletonForMovieCard key={idx} />
              ))}
              {skeletonSize === 0 && (
                <AiGenBlock
                  userSelection={userSelection}
                  setUserSelection={setUserSelection}
                  startAiRecommendation={startAiRecommendation}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
