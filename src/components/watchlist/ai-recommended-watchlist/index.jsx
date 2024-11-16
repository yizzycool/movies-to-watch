import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import useQueryAiRecommendedWatchlist from '@/hooks/watchlist/ai-recommended-watchlist/user-query-ai-recommended-watchlist';
import { useLazySearchMoviesQuery } from '@/store/apis/tmdb';
import TmdbImage, { TmdbImageTypes } from '@/components/common/tmdb-image';
import TmdbMovieHoverMask from '@/components/common/tmdb-movie-hover-mask';
import LoadingSkeleton from './loading-skeleton';
import LoadingSkeletonForMovieCard from './loading-skeleton/movie-card';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _size from 'lodash/size';
import _range from 'lodash/range';
import _indexOf from 'lodash/indexOf';

export default forwardRef(function AiRecommendedWatchlist(
  { fetchedData, userSelection },
  ref,
) {
  const router = useRouter();

  // Hook to get ai recommendation movie lists
  const { setRun, aiRecommendations } = useQueryAiRecommendedWatchlist({
    fetchedData,
    userSelection,
  });

  const [recommendationData, setRecommendationData] = useState([]);
  const [searchTrigger, result] = useLazySearchMoviesQuery();
  const { data, originalArgs } = result;

  const skeletonSize = useMemo(() => {
    return _size(aiRecommendations) - _size(recommendationData);
  }, [aiRecommendations, recommendationData]);

  // Trigger Tmdb search API after get ai recommendation list (movie titles)
  useEffect(() => {
    if (_isEmpty(aiRecommendations)) return;
    searchTrigger({ query: aiRecommendations[0] });
  }, [aiRecommendations]);

  // Loop query top 10 ai recommendation list
  useEffect(() => {
    if (_isEmpty(data)) return;
    if (skeletonSize <= 0) return;
    const lastQuery = _get(originalArgs, 'query');
    const lastIndex = _indexOf(aiRecommendations, lastQuery);
    if (lastIndex === -1) return;
    if (lastIndex === _size(aiRecommendations) - 1) return;
    searchTrigger({ query: aiRecommendations[lastIndex + 1] });
  }, [data]);

  // Update recommendationData
  useEffect(() => {
    if (_isEmpty(data)) return;
    const result = _get(data, 'results.0');
    if (_isEmpty(result)) return;
    setRecommendationData((prev) => [...prev, result]);
  }, [data]);

  useImperativeHandle(ref, () => ({
    start: () => {
      setRecommendationData([]);
      setRun(true);
    },
  }));

  const getMovieId = (result) => _get(result, 'id', null);

  const getPosterPath = (result) => _get(result, 'poster_path', null);

  // Navigate to /movie page
  const onMovieClick = (result) => {
    const url = `/movie?id=${getMovieId(result)}`;
    router.push(url);
  };

  return (
    <div className="container-xl text-center border-top">
      {_isEmpty(recommendationData) ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="fs-3 mt-5">AI Recommended Watchlist</div>
          <div className="row gx-3 gy-3 my-5">
            {recommendationData.map((result, idx) => (
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
          </div>
        </>
      )}
    </div>
  );
});
