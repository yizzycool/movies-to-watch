import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import TmdbImage, { TmdbImageTypes } from '@/components/common/tmdb-image';
import TmdbMovieHoverMask from '@/components/common/tmdb-movie-hover-mask';
import LoadingSkeleton from './loading-skeleton';
import LoadingSkeletonForMovieCard from './loading-skeleton/movie-card';
import AiGenBlock from './ai-gen-block';
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
      {_isEmpty(fetchedData) ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="fs-3">Your Watch List</div>
          <div className="row gx-3 gy-3 my-5">
            {fetchedData.map((result, idx) => (
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
            {_range(skeletonSize).map((idx) => (
              <LoadingSkeletonForMovieCard key={idx} />
            ))}
            <AiGenBlock
              userSelection={userSelection}
              setUserSelection={setUserSelection}
              startAiRecommendation={startAiRecommendation}
            />
          </div>
        </>
      )}
    </div>
  );
}
